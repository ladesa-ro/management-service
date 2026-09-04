import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { IGradeHorariaPermissionChecker } from "../../domain/authorization";

@Impl()
export class GradeHorariaPermissionCheckerImpl implements IGradeHorariaPermissionChecker {
  async ensureCanCreate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    _id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
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
      throw new ForbiddenError("Apenas administradores podem remover grades horárias.");
    }
  }
}
