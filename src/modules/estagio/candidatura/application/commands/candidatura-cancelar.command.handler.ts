import { BadRequestException } from "@nestjs/common";
import { ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioCandidaturaPermissionChecker } from "../../domain/authorization/estagio-candidatura-permission-checker.interface";
import type { CandidaturaCancelarCommand } from "../../domain/commands/candidatura-cancelar.command";
import type { ICandidaturaCancelarCommandHandler } from "../../domain/commands/candidatura-cancelar.command.handler.interface";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import { IEstagioCandidaturaRepository } from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class CandidaturaCancelarCommandHandlerImpl implements ICandidaturaCancelarCommandHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagioCandidaturaPermissionChecker)
    private readonly permissionChecker: IEstagioCandidaturaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CandidaturaCancelarCommand,
  ): Promise<boolean> {
    const actorId = accessContext?.requestActor?.id;
    if (!actorId) {
      throw new UnauthorizedError("Usuário não autenticado.");
    }

    const candidatura = await this.repository.loadById(accessContext, dto.candidaturaId);
    if (!candidatura) {
      throw new ResourceNotFoundError(EstagioCandidatura.entityName, dto.candidaturaId);
    }

    await this.permissionChecker.ensureCanCancelar(accessContext, candidatura.estagiario.id);

    if (candidatura.situacao !== "PENDING" && candidatura.situacao !== "OFFERED") {
      throw new BadRequestException(
        `Candidatura não pode ser cancelada no estado atual (${candidatura.situacao}).`,
      );
    }

    candidatura.cancelar(dto.motivo);
    await this.repository.save(candidatura);

    return true;
  }
}
