import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagioPermissionChecker } from "../../domain/authorization/estagio-permission-checker.interface";

@Impl()
export class EstagioPermissionCheckerImpl implements IEstagioPermissionChecker {
  constructor(
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async ensureCanManageEstagio(accessContext: IAccessContext | null): Promise<void> {
    const actor = accessContext?.requestActor;
    if (!actor) {
      throw new UnauthorizedError("Usuário deve estar autenticado para realizar esta operação.");
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
        "Apenas servidores do CIEC, coordenadores ou administradores podem gerenciar vagas e contratos de estágio diretamente.",
      );
    }
  }
}
