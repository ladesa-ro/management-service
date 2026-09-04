import { BadRequestException } from "@nestjs/common";
import { ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import type { CandidaturaCancelarCommand } from "../../domain/commands/candidatura-cancelar.command";
import type { ICandidaturaCancelarCommandHandler } from "../../domain/commands/candidatura-cancelar.command.handler.interface";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import { IEstagioCandidaturaRepository } from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class CandidaturaCancelarCommandHandlerImpl implements ICandidaturaCancelarCommandHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CandidaturaCancelarCommand,
  ): Promise<boolean> {
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

    // Proteção contra enumeração/IDOR: se não existe ou não pertence ao aluno autenticado, retorna 404
    if (!candidatura || !estagiario || candidatura.estagiario.id !== estagiario.id) {
      throw new ResourceNotFoundError(EstagioCandidatura.entityName, dto.candidaturaId);
    }

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
