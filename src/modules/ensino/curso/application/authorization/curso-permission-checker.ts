import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { ICursoPermissionChecker } from "../../domain/authorization";

@Impl()
export class CursoPermissionCheckerImpl implements ICursoPermissionChecker {
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
      throw new ForbiddenError("Você não tem permissão para cadastrar cursos em outro campus.");
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
      throw new ForbiddenError("Você não tem permissão para alterar cursos de outro campus.");
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
      throw new ForbiddenError("Apenas administradores podem remover cursos.");
    }
  }
}
