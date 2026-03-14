import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

export interface IPermissionChecker {
  ensureCanCreate(accessContext: AccessContext, payload: { dto: unknown }): Promise<void>;
  ensureCanUpdate(
    accessContext: AccessContext,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
  ensureCanDelete(
    accessContext: AccessContext,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
}
