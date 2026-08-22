import type { IAccessContext } from "@/domain/abstractions";
import { Impl } from "@/domain/dependency-injection";
import { noop } from "@/utils/noop";
import type { ICalendarioIndisponibilidadeAmbientePermissionChecker } from "../../domain/authorization";

@Impl()
export class CalendarioIndisponibilidadeAmbientePermissionCheckerImpl
  implements ICalendarioIndisponibilidadeAmbientePermissionChecker
{
  async ensureCanCreate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
  ): Promise<void> {
    noop(accessContext, payload);
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    noop(accessContext, payload, id);
  }

  async ensureCanDelete(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    noop(accessContext, payload, id);
  }
}
