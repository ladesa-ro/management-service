import type { IAccessContext } from "@/domain/abstractions";

/**
 * Contrato de autorização por operação. Cada módulo implementa sua política de acesso.
 * Os métodos lançam exceção se o acesso for negado — padrão "throw on deny" para
 * garantir que a ausência de checagem nunca permita acesso silencioso.
 */

export interface IPermissionChecker {
  ensureCanCreate(accessContext: IAccessContext | null, payload: { dto: unknown }): Promise<void>;
  ensureCanUpdate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
  ensureCanDelete(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
    id: string,
  ): Promise<void>;
}
