import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";

@Impl()
export class EstagioSolicitacaoPermissionCheckerImpl
  implements IEstagioSolicitacaoPermissionChecker
{
  constructor(
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  async ensureCanCreateSolicitacao(
    accessContext: IAccessContext | null,
  ): Promise<{ estagiarioId: string; campusId: string }> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError(
        "Usuário deve estar autenticado para criar uma solicitação de estágio.",
      );
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actor.id);
    const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);

    if (!estagiario && perfis.length > 0) {
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario) {
      throw new ForbiddenError(
        "Apenas usuários com perfil de estudante/estagiário podem solicitar estágio.",
      );
    }

    let campusId: string | undefined = accessContext?.currentCampusId ?? undefined;
    if (!campusId && perfis.length > 0) {
      const perfilComCampus = perfis.find((p) => p.campus?.id);
      if (perfilComCampus?.campus?.id) {
        campusId = perfilComCampus.campus.id;
      }
    }

    if (!campusId && estagiario.perfil?.id) {
      const perfil = await this.perfilRepository.getFindOneQueryResult(accessContext, {
        id: estagiario.perfil.id,
      });
      if (perfil?.campus?.id) {
        campusId = perfil.campus.id;
      }
    }

    if (!campusId) {
      throw new ForbiddenError(
        "Não foi possível determinar o campus do estagiário para a solicitação.",
      );
    }

    return { estagiarioId: estagiario.id, campusId };
  }

  async ensureCanManageSolicitacoes(
    accessContext: IAccessContext | null,
  ): Promise<{ userId: string }> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError(
        "Usuário deve estar autenticado para gerenciar solicitações de estágio.",
      );
    }

    if (actor.isSuperUser) {
      return { userId: actor.id };
    }

    const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
    const hasStaffCargo = perfis.some((p) => {
      const cargoNome = p.cargo?.nome?.toLowerCase() ?? "";
      return cargoNome !== "aluno" && cargoNome !== "";
    });

    if (!hasStaffCargo) {
      throw new ForbiddenError(
        "Apenas servidores do CIEC ou administradores podem analisar solicitações.",
      );
    }

    return { userId: actor.id };
  }

  async ensureCanCancelSolicitacao(
    accessContext: IAccessContext | null,
    solicitacao: EstagioSolicitacao,
  ): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para cancelar uma solicitação.");
    }

    if (actor.isSuperUser) {
      return;
    }

    const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
    const hasStaffCargo = perfis.some((p) => {
      const cargoNome = p.cargo?.nome?.toLowerCase() ?? "";
      return cargoNome !== "aluno" && cargoNome !== "";
    });

    if (hasStaffCargo) {
      return;
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actor.id);
    if (!estagiario && perfis.length > 0) {
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario || estagiario.id !== solicitacao.estagiario.id) {
      throw new ForbiddenError(
        "Você não tem permissão para cancelar uma solicitação de outro estagiário.",
      );
    }
  }

  async ensureCanViewMinhasSolicitacoes(
    accessContext: IAccessContext | null,
  ): Promise<{ estagiarioId: string }> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError(
        "Usuário deve estar autenticado para visualizar suas solicitações.",
      );
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
      throw new ForbiddenError("Usuário autenticado não possui perfil de estudante/estagiário.");
    }

    return { estagiarioId: estagiario.id };
  }
}
