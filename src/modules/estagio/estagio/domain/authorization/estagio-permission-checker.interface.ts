import type { IAccessContext } from "@/domain/abstractions";

export abstract class IEstagioPermissionChecker {
  abstract ensureCanManageEstagio(accessContext: IAccessContext | null): Promise<void>;
}
