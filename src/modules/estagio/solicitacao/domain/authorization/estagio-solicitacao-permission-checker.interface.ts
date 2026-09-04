import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";

export abstract class IEstagioSolicitacaoPermissionChecker {
  abstract ensureCanCreateSolicitacao(
    accessContext: IAccessContext | null,
  ): Promise<{ estagiarioId: string; campusId: string }>;

  abstract ensureCanManageSolicitacoes(
    accessContext: IAccessContext | null,
  ): Promise<{ userId: string }>;

  abstract ensureCanCancelSolicitacao(
    accessContext: IAccessContext | null,
    solicitacao: EstagioSolicitacao,
  ): Promise<void>;

  abstract ensureCanViewMinhasSolicitacoes(
    accessContext: IAccessContext | null,
  ): Promise<{ estagiarioId: string }>;
}
