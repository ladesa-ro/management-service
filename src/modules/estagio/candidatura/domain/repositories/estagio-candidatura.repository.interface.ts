import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioCandidatura } from "../estagio-candidatura";

export const IEstagioCandidaturaRepository = Symbol("IEstagioCandidaturaRepository");

export interface IMinhasCandidaturasItem {
  id: string;
  situacao: string;
  posicaoFila: number | null;
  dataInscricao: string;
  dataOferta: string | null;
  expiraEm: string | null;
  dataResposta: string | null;
  acaoDisponivel: boolean;
  estagio: {
    id: string;
    status: string;
    cargaHoraria: number;
    empresa: { id: string; razaoSocial?: string; nomeFantasia?: string } | null;
    campus: { id: string; nome?: string } | null;
    CursoReferencia: { id: string; nome?: string } | null;
  };
}

export interface IEstagioCandidaturaRepository {
  loadById(accessContext: IAccessContext | null, id: string): Promise<EstagioCandidatura | null>;
  save(aggregate: EstagioCandidatura): Promise<void>;
  findActiveByEstagioAndEstagiario(
    estagioId: string,
    estagiarioId: string,
  ): Promise<EstagioCandidatura | null>;
  findActiveOfferByEstagio(estagioId: string): Promise<EstagioCandidatura | null>;
  calcularPosicaoFila(
    estagioId: string,
    dataInscricao: string,
    candidaturaId: string,
  ): Promise<number>;
  findMinhasCandidaturas(
    accessContext: IAccessContext | null,
    estagiarioId: string,
    options: {
      page?: number;
      limit?: number;
      situacao?: string;
    },
  ): Promise<{ items: IMinhasCandidaturasItem[]; total: number }>;
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    id: string,
  ): Promise<IMinhasCandidaturasItem | null>;
}
