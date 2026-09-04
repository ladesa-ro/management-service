import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import {
  ConflictError,
  ensureExists,
  ResourceNotFoundError,
  UnauthorizedError,
} from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EstagioNotificacaoPushService } from "@/modules/acesso/notificacao/application/services";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import { getNowISO } from "@/utils/date";
import type { CandidaturaAceitarCommand } from "../../domain/commands/candidatura-aceitar.command";
import type { ICandidaturaAceitarCommandHandler } from "../../domain/commands/candidatura-aceitar.command.handler.interface";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import {
  IEstagioCandidaturaRepository,
  type IMinhasCandidaturasItem,
} from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class CandidaturaAceitarCommandHandlerImpl implements ICandidaturaAceitarCommandHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly pushService: EstagioNotificacaoPushService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CandidaturaAceitarCommand,
  ): Promise<IMinhasCandidaturasItem> {
    const actorId = accessContext?.requestActor?.id;
    if (!actorId) {
      throw new UnauthorizedError("Usuário não autenticado.");
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actorId);
    if (!estagiario) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actorId);
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    const candidatura = await this.repository.loadById(accessContext, dto.candidaturaId);

    // Proteção anti-IDOR: se não existe ou não pertence ao aluno autenticado, retorna 404
    if (!candidatura || !estagiario || candidatura.estagiario.id !== estagiario.id) {
      throw new ResourceNotFoundError(EstagioCandidatura.entityName, dto.candidaturaId);
    }

    if (candidatura.situacao !== "OFFERED") {
      throw new BadRequestException("Candidatura não está com oferta ativa para aceite.");
    }

    if (!candidatura.isOfertaValida()) {
      candidatura.expirar();
      await this.repository.save(candidatura);
      throw new HttpException(
        "O prazo desta oferta expirou.",
        HttpStatus.GONE, // 410 Gone
      );
    }

    // Bloqueio pessimista na vaga para garantir atomicidade contra disputas concorrentes
    const estagioRepo = this.appTypeormConnection.getRepository(EstagioTypeormEntity);
    const estagioLocked = await estagioRepo
      .createQueryBuilder("estagio")
      .setLock("pessimistic_write")
      .where("estagio.id = :id", { id: candidatura.estagio.id })
      .andWhere("estagio.dateDeleted IS NULL")
      .getOne();

    if (!estagioLocked) {
      throw new ResourceNotFoundError("Estagio", candidatura.estagio.id);
    }

    if (estagioLocked.status !== EstagioStatus.DISPONIVEL || estagioLocked.estagiario !== null) {
      throw new ConflictError("A vaga já foi preenchida ou não está mais disponível.");
    }

    const now = getNowISO();

    // 1. Vincula estagiário e muda status do estágio
    estagioLocked.estagiario = { id: estagiario.id } as any;
    estagioLocked.status = EstagioStatus.EM_FASE_INICIAL;
    estagioLocked.dateUpdated = now;
    await estagioRepo.save(estagioLocked);

    // 2. Marca candidatura como aceita
    candidatura.aceitar();
    await this.repository.save(candidatura);

    // 3. Notificação Push / WebSocket
    try {
      this.pushService.notificarEstagioFaseInicial(
        estagioLocked.id,
        accessContext?.requestActor?.nome ?? undefined,
      );
    } catch {
      // push notification silenciada se indisponível
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, candidatura.id);
    ensureExists(result, EstagioCandidatura.entityName, candidatura.id);

    return result as IMinhasCandidaturasItem;
  }
}
