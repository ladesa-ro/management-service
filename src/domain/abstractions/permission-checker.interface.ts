import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

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
