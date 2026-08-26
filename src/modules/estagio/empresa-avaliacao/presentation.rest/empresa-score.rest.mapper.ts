import { createMapper } from "@/shared/mapping";
import type { EmpresaScoreFindOneQueryResult } from "../domain/queries/empresa-score-find-one.query.result";
import type { EmpresaScoreFindOneOutputRestDto } from "./empresa-score.rest.dto";

export const EmpresaScoreRestMapper = {
  findOneQueryResultToOutputDto: createMapper<
    EmpresaScoreFindOneQueryResult,
    EmpresaScoreFindOneOutputRestDto
  >((result) => ({
    id: result.id,
    empresaId: result.empresaId,
    score: result.score,
    averageRating: result.averageRating,
    totalReviews: result.totalReviews,
    distribution: result.distribution,
    scoreVersion: result.scoreVersion,
    indicators: result.indicators,
    calculatedAt: result.calculatedAt,
    dateCreated: result.dateCreated,
    dateUpdated: result.dateUpdated,
    dateDeleted: result.dateDeleted,
  })),
};
