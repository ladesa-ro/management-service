import { BadRequestException } from "@nestjs/common";
import {
  ConflictError,
  ensureExists,
  ForbiddenError,
  UnauthorizedError,
} from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { IEstagioCandidaturaPermissionChecker } from "../../domain/authorization/estagio-candidatura-permission-checker.interface";
import type { CandidaturaCreateCommand } from "../../domain/commands/candidatura-create.command";
import type { ICandidaturaCreateCommandHandler } from "../../domain/commands/candidatura-create.command.handler.interface";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import {
  IEstagioCandidaturaRepository,
  type IMinhasCandidaturasItem,
} from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class CandidaturaCreateCommandHandlerImpl implements ICandidaturaCreateCommandHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagioRepository)
    private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Dep(IEstagioCandidaturaPermissionChecker)
    private readonly permissionChecker: IEstagioCandidaturaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CandidaturaCreateCommand,
  ): Promise<IMinhasCandidaturasItem> {
    await this.permissionChecker.ensureCanCandidatar(accessContext);

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

    if (!estagiario) {
      throw new ForbiddenError("Usuário não possui perfil de estagiário cadastrado.");
    }

    const estagio = await this.estagioRepository.loadById(accessContext, dto.estagioId);
    ensureExists(estagio, "Estagio", dto.estagioId);

    if (estagio.status !== EstagioStatus.DISPONIVEL || estagio.estagiario !== null) {
      throw new BadRequestException("Esta vaga não está disponível para candidatura.");
    }

    const candidaturaAtiva = await this.repository.findActiveByEstagioAndEstagiario(
      dto.estagioId,
      estagiario.id,
    );

    if (candidaturaAtiva) {
      throw new ConflictError("O aluno já possui uma candidatura ativa para esta vaga.");
    }

    const candidatura = EstagioCandidatura.create({
      estagio: { id: dto.estagioId },
      estagiario: { id: estagiario.id },
    });

    await this.repository.save(candidatura);

    const result = await this.repository.getFindOneQueryResult(accessContext, candidatura.id);
    ensureExists(result, EstagioCandidatura.entityName, candidatura.id);

    return result;
  }
}
