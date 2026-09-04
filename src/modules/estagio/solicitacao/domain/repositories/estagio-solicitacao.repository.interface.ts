import type { EstagioSolicitacao } from "../estagio-solicitacao";
import type {
  EstagioSolicitacaoSituacao,
  EstagioSolicitacaoTipo,
} from "../estagio-solicitacao.fields";

export interface EstagioSolicitacaoListFilter {
  campusId?: string;
  situacao?: EstagioSolicitacaoSituacao;
  tipo?: EstagioSolicitacaoTipo;
  estagiarioId?: string;
}

export abstract class IEstagioSolicitacaoRepository {
  abstract findById(id: string): Promise<EstagioSolicitacao | null>;
  abstract save(solicitacao: EstagioSolicitacao): Promise<EstagioSolicitacao>;
  abstract listAll(filter?: EstagioSolicitacaoListFilter): Promise<EstagioSolicitacao[]>;
  abstract findByEstagiarioId(estagiarioId: string): Promise<EstagioSolicitacao[]>;
  abstract countActiveByEstagiarioId(estagiarioId: string): Promise<number>;
}
