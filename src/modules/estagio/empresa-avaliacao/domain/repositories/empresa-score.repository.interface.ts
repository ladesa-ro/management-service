import type { IAccessContext } from "@/domain/abstractions";
import type { EmpresaScore } from "../empresa-score";
import type { EmpresaScoreFindOneQueryResult } from "../queries/empresa-score-find-one.query.result";

export const IEmpresaScoreRepository = Symbol("IEmpresaScoreRepository");

export interface IEmpresaScoreRepository {
  loadByEmpresaId(
    accessContext: IAccessContext | null,
    empresaId: string,
  ): Promise<EmpresaScore | null>;
  save(aggregate: EmpresaScore): Promise<void>;
  saveScoreHistorico(historico: {
    id?: string;
    empresaId: string;
    score: number;
    averageRating: number;
    totalReviews: number;
    scoreVersion: number;
    indicatorsJson?: Record<string, any> | null;
    calculatedAt: string;
  }): Promise<void>;
  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: { empresaId: string },
  ): Promise<EmpresaScoreFindOneQueryResult | null>;
}
