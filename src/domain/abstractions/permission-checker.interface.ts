import type { AccessContext } from "@/server/access-context";

export interface IPermissionChecker {
  ensureCanCreate(accessContext: AccessContext | null, payload: { dto: unknown }): Promise<void>;
  ensureCanUpdate(
    accessContext: AccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
  ensureCanDelete(
    accessContext: AccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
}
