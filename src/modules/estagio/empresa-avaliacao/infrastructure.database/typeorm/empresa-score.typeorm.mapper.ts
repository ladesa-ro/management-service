import { createMapper } from "@/shared/mapping";
import type { EmpresaScore, IEmpresaScore } from "../../domain/empresa-score";
import type { EmpresaScoreFindOneQueryResult } from "../../domain/queries/empresa-score-find-one.query.result";
import type { EmpresaScoreTypeormEntity } from "./empresa-score.typeorm.entity";

export const EmpresaScoreTypeormMapper = {
  domainToPersistence: createMapper<EmpresaScore, Partial<EmpresaScoreTypeormEntity>>((domain) => ({
    id: domain.id,
    empresa: { id: domain.empresa.id } as any,
    score: domain.score,
    averageRating: domain.averageRating,
    totalReviews: domain.totalReviews,
    distribution: domain.distribution,
    scoreVersion: domain.scoreVersion,
    indicatorsJson: domain.indicators,
    calculatedAt: domain.calculatedAt,
    dateCreated: domain.dateCreated,
    dateUpdated: domain.dateUpdated,
    dateDeleted: domain.dateDeleted,
  })),

  entityToDomain: createMapper<EmpresaScoreTypeormEntity, IEmpresaScore>((entity) => ({
    id: entity.id,
    empresa: { id: entity.empresa?.id },
    score: Number(entity.score),
    averageRating: Number(entity.averageRating),
    totalReviews: Number(entity.totalReviews),
    distribution: entity.distribution ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    scoreVersion: Number(entity.scoreVersion ?? 1),
    indicators: entity.indicatorsJson ?? null,
    calculatedAt: entity.calculatedAt,
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
    dateDeleted: entity.dateDeleted,
  })),

  entityToFindOneQueryResult: createMapper<
    EmpresaScoreTypeormEntity,
    EmpresaScoreFindOneQueryResult
  >((entity) => ({
    id: entity.id,
    empresaId: entity.empresa?.id,
    score: Number(entity.score),
    averageRating: Number(entity.averageRating),
    totalReviews: Number(entity.totalReviews),
    distribution: entity.distribution ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    scoreVersion: Number(entity.scoreVersion ?? 1),
    indicators: entity.indicatorsJson ?? null,
    calculatedAt: entity.calculatedAt,
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
    dateDeleted: entity.dateDeleted,
  })),
};
