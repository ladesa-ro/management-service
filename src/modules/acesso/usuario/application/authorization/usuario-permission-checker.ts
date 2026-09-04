import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { IUsuarioPermissionChecker } from "../../domain/authorization";

@Impl()
export class UsuarioPermissionCheckerImpl implements IUsuarioPermissionChecker {
  async ensureCanCreate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (!accessContext.requestActor.isSuperUser) {
      throw new ForbiddenError("Apenas administradores podem cadastrar novos usuários.");
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    const actor = accessContext.requestActor;

    if (actor.isSuperUser) {
      return;
    }

    // Um usuário só pode atualizar o próprio cadastro
    if (actor.id !== id) {
      throw new ForbiddenError("Você não tem permissão para alterar dados de outro usuário.");
    }

    // Prevenir escalação de privilégios
    const dto = payload?.dto as Record<string, unknown> | undefined;
    if (dto && (dto.isSuperUser === true || dto.is_super_user === true)) {
      throw new ForbiddenError("Não é permitido auto-atribuir privilégios de superusuário.");
    }
  }

  async ensureCanDelete(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    _id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (!accessContext.requestActor.isSuperUser) {
      throw new ForbiddenError("Apenas administradores podem remover usuários.");
    }
  }
}
