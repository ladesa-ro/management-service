import { UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import type { ICalendarioIndisponibilidadeProfessorPermissionChecker } from "../../domain/authorization";

@Impl()
export class CalendarioIndisponibilidadeProfessorPermissionCheckerImpl
  implements ICalendarioIndisponibilidadeProfessorPermissionChecker
{
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
  }
}
