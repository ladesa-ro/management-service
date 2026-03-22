import type { AccessContext } from "@/server/access-context";

/**
 * Contrato de autorização por operação. Cada módulo implementa sua política de acesso.
 * Os métodos lançam exceção se o acesso for negado — padrão "throw on deny" para
 * garantir que a ausência de checagem nunca permita acesso silencioso.
 */
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
