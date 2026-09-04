import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { IBlocoPermissionChecker } from "../../domain/authorization";

@Impl()
export class BlocoPermissionCheckerImpl implements IBlocoPermissionChecker {
  async ensureCanCreate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    const dto = payload?.dto as { campus?: { id: string } } | undefined;
    const campusId = dto?.campus?.id;

    if (accessContext.currentCampusId && campusId && accessContext.currentCampusId !== campusId) {
      throw new ForbiddenError("Você não tem permissão para cadastrar blocos em outro campus.");
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    _id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    const dto = payload?.dto as { campus?: { id: string } } | undefined;
    const campusId = dto?.campus?.id;

    if (accessContext.currentCampusId && campusId && accessContext.currentCampusId !== campusId) {
      throw new ForbiddenError("Você não tem permissão para alterar blocos de outro campus.");
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
      throw new ForbiddenError("Apenas administradores podem remover blocos.");
    }
  }
}
