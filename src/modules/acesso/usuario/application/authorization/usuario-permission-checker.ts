import type { IAccessContext } from "@/domain/abstractions";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { noop } from "@/utils/noop";
import type { IUsuarioPermissionChecker } from "../../domain/authorization";

@DeclareImplementation()
export class UsuarioPermissionCheckerImpl implements IUsuarioPermissionChecker {
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
