import type { IAccessContext } from "@/domain/abstractions";
import type { EmpresaAvaliacao } from "../empresa-avaliacao";
import type { EmpresaAvaliacaoCurtida } from "../empresa-avaliacao-curtida";
import type { EmpresaAvaliacaoHistorico } from "../empresa-avaliacao-historico";
import type {
  EmpresaAvaliacaoFindOneQueryResult,
  EmpresaAvaliacaoHistoricoQueryResult,
  EmpresaAvaliacaoListQuery,
  EmpresaAvaliacaoListQueryResult,
} from "../queries";

export const IEmpresaAvaliacaoRepository = Symbol("IEmpresaAvaliacaoRepository");

export interface IEmpresaAvaliacaoRepository {
  // Aggregate Write side
  loadById(accessContext: IAccessContext | null, id: string): Promise<EmpresaAvaliacao | null>;
  save(aggregate: EmpresaAvaliacao): Promise<void>;
  softDeleteById(id: string): Promise<void>;

  // Specific domain queries / checks
  findActiveByEmpresaAndEstagiario(
    empresaId: string,
    estagiarioId: string,
  ): Promise<EmpresaAvaliacao | null>;

  findAllActiveByEmpresa(
    empresaId: string,
  ): Promise<Array<{ rating: number; dateCreated: string }>>;

  checkInternshipEligibility(
    userId: string,
    empresaId: string,
  ): Promise<{ eligible: boolean; estagiarioId?: string; reason?: string }>;

  // Likes management & auditing
  findActiveLike(avaliacaoId: string, usuarioId: string): Promise<EmpresaAvaliacaoCurtida | null>;
  findAnyLike(avaliacaoId: string, usuarioId: string): Promise<EmpresaAvaliacaoCurtida | null>;
  saveLike(like: EmpresaAvaliacaoCurtida): Promise<void>;
  countActiveLikes(avaliacaoId: string): Promise<number>;
  isLikedByUser(avaliacaoId: string, usuarioId: string): Promise<boolean>;

  // History & Auditing
  saveHistorico(historico: EmpresaAvaliacaoHistorico): Promise<void>;
  findHistoricoByAvaliacaoId(avaliacaoId: string): Promise<EmpresaAvaliacaoHistoricoQueryResult[]>;

  // Read side
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: { id: string },
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null>;

  getFindMyQueryResult(
    accessContext: IAccessContext | null,
    empresaId: string,
    userId: string,
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null>;

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoListQuery,
  ): Promise<EmpresaAvaliacaoListQueryResult>;
}
