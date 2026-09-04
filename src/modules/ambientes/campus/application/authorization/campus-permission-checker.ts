import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { ICampusPermissionChecker } from "../../domain/authorization";

@Impl()
export class CampusPermissionCheckerImpl implements ICampusPermissionChecker {
  async ensureCanCreate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (!accessContext.requestActor.isSuperUser) {
      throw new ForbiddenError("Apenas administradores podem cadastrar um campus.");
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    if (accessContext.currentCampusId && accessContext.currentCampusId !== id) {
      throw new ForbiddenError("Você não tem permissão para alterar dados de outro campus.");
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
      throw new ForbiddenError("Apenas administradores podem remover um campus.");
    }
  }
}
