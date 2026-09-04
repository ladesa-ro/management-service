import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";

export abstract class IMinhasSolicitacoesListQueryHandler {
  abstract execute(accessContext: IAccessContext | null): Promise<EstagioSolicitacao[]>;
}
