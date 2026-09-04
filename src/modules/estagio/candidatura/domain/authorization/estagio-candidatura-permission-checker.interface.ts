import type { IAccessContext } from "@/domain/abstractions";

export const IEstagioCandidaturaPermissionChecker = Symbol("IEstagioCandidaturaPermissionChecker");

export interface IEstagioCandidaturaPermissionChecker {
  ensureCanCandidatar(accessContext: IAccessContext | null): Promise<void>;
  ensureCanConvocar(accessContext: IAccessContext | null): Promise<void>;
  ensureCanAceitar(
    accessContext: IAccessContext | null,
    estagiarioIdDaCandidatura: string,
  ): Promise<void>;
  ensureCanCancelar(
    accessContext: IAccessContext | null,
    estagiarioIdDaCandidatura: string,
  ): Promise<void>;
}
