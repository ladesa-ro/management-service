import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import { IEstagioCandidaturaPermissionChecker } from "../../domain/authorization/estagio-candidatura-permission-checker.interface";

@Impl()
export class EstagioCandidaturaPermissionCheckerImpl
  implements IEstagioCandidaturaPermissionChecker
{
  constructor(
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  async ensureCanCandidatar(accessContext: IAccessContext | null): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para se candidatar a uma vaga.");
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actor.id);
    if (!estagiario) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario) {
      throw new ForbiddenError(
        "Apenas usuários com perfil ativo de estudante/estagiário podem se candidatar.",
      );
    }
  }

  async ensureCanConvocar(accessContext: IAccessContext | null): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para convocar candidatos.");
    }

    if (actor.isSuperUser) {
      return;
    }

    const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
    const hasStaffCargo = perfis.some((p) => {
      const cargoNome = p.cargo?.nome?.toLowerCase() ?? "";
      return cargoNome !== "aluno" && cargoNome !== "";
    });

    if (!hasStaffCargo) {
      throw new ForbiddenError(
        "Apenas servidores do CIEC ou coordenadores autorizados podem convocar candidatos.",
      );
    }
  }

  async ensureCanAceitar(
    accessContext: IAccessContext | null,
    estagiarioIdDaCandidatura: string,
  ): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para responder a uma oferta.");
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actor.id);
    if (!estagiario) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario || estagiario.id !== estagiarioIdDaCandidatura) {
      throw new ForbiddenError("Você não tem permissão para responder por esta candidatura.");
    }
  }

  async ensureCanCancelar(
    accessContext: IAccessContext | null,
    estagiarioIdDaCandidatura: string,
  ): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para cancelar uma candidatura.");
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actor.id);
    if (!estagiario) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario || estagiario.id !== estagiarioIdDaCandidatura) {
      throw new ForbiddenError(
        "Você não tem permissão para cancelar uma candidatura de outro aluno.",
      );
    }
  }
}
