import { BadRequestException } from "@nestjs/common";
import { ConflictError, ensureExists, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { IEstagioCandidaturaPermissionChecker } from "../../domain/authorization/estagio-candidatura-permission-checker.interface";
import type { CandidaturaConvocarCommand } from "../../domain/commands/candidatura-convocar.command";
import type { ICandidaturaConvocarCommandHandler } from "../../domain/commands/candidatura-convocar.command.handler.interface";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import {
  IEstagioCandidaturaRepository,
  type IMinhasCandidaturasItem,
} from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class CandidaturaConvocarCommandHandlerImpl implements ICandidaturaConvocarCommandHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagioRepository)
    private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagioCandidaturaPermissionChecker)
    private readonly permissionChecker: IEstagioCandidaturaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CandidaturaConvocarCommand,
  ): Promise<IMinhasCandidaturasItem> {
    await this.permissionChecker.ensureCanConvocar(accessContext);

    const autorId = accessContext?.requestActor?.id;
    if (!autorId) {
      throw new UnauthorizedError("Usuário não autenticado.");
    }

    const candidatura = await this.repository.loadById(accessContext, dto.candidaturaId);
    ensureExists(candidatura, EstagioCandidatura.entityName, dto.candidaturaId);

    if (candidatura.situacao !== "PENDING") {
      throw new BadRequestException(
        `Apenas candidaturas em lista de espera (PENDING) podem ser convocadas. Situação atual: ${candidatura.situacao}.`,
      );
    }

    const estagio = await this.estagioRepository.loadById(accessContext, candidatura.estagio.id);
    ensureExists(estagio, "Estagio", candidatura.estagio.id);

    if (estagio.status !== EstagioStatus.DISPONIVEL || estagio.estagiario !== null) {
      throw new BadRequestException("A vaga não está disponível para convocação.");
    }

    const ofertaAtiva = await this.repository.findActiveOfferByEstagio(candidatura.estagio.id);
    if (ofertaAtiva && ofertaAtiva.id !== candidatura.id) {
      throw new ConflictError(
        "Já existe uma oferta ativa para esta vaga. Aguarde a resposta ou expiração.",
      );
    }

    const dias = dto.diasValidade && dto.diasValidade > 0 ? dto.diasValidade : 5;
    const expiraEm = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString();

    candidatura.convocar(autorId, expiraEm);
    await this.repository.save(candidatura);

    const result = await this.repository.getFindOneQueryResult(accessContext, candidatura.id);
    ensureExists(result, EstagioCandidatura.entityName, candidatura.id);

    return result;
  }
}
