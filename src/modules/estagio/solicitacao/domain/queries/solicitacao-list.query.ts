import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioSolicitacao } from "../estagio-solicitacao";
import type {
  EstagioSolicitacaoSituacao,
  EstagioSolicitacaoTipo,
} from "../estagio-solicitacao.fields";

export interface EstagioSolicitacaoListQuery {
  campusId?: string;
  situacao?: EstagioSolicitacaoSituacao;
  tipo?: EstagioSolicitacaoTipo;
}

export abstract class IEstagioSolicitacaoListQueryHandler {
  abstract execute(
    accessContext: IAccessContext | null,
    query?: EstagioSolicitacaoListQuery,
  ): Promise<EstagioSolicitacao[]>;
}
