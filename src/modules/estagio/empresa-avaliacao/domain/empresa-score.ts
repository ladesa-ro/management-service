import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { EmpresaScoreCreateSchema, EmpresaScoreSchema } from "./empresa-score.schemas";

export interface IEmpresaScore {
  id: string;
  empresa: { id: string };
  score: number;
  averageRating: number;
  totalReviews: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  scoreVersion: number;
  indicators: Record<string, any> | null;
  calculatedAt: string;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class EmpresaScore {
  static readonly entityName = "EmpresaScore";

  id!: IdUuid;
  empresa!: { id: string };
  score!: number;
  averageRating!: number;
  totalReviews!: number;
  distribution!: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  scoreVersion!: number;
  indicators!: Record<string, any> | null;
  calculatedAt!: ScalarDateTimeString;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): EmpresaScore {
    const parsed = zodValidate(EmpresaScore.entityName, EmpresaScoreCreateSchema.domain, dados);

    const instance = new EmpresaScore();
    instance.id = generateUuidV7();
    instance.empresa = parsed.empresa;
    instance.score = parsed.score;
    instance.averageRating = parsed.averageRating;
    instance.totalReviews = parsed.totalReviews;
    instance.distribution = parsed.distribution;
    instance.scoreVersion = parsed.scoreVersion;
    instance.indicators = parsed.indicators ?? null;
    instance.calculatedAt = parsed.calculatedAt;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): EmpresaScore {
    const parsed = zodValidate(EmpresaScore.entityName, EmpresaScoreSchema, dados);

    const instance = new EmpresaScore();
    instance.id = parsed.id;
    instance.empresa = parsed.empresa;
    instance.score = parsed.score;
    instance.averageRating = parsed.averageRating;
    instance.totalReviews = parsed.totalReviews;
    instance.distribution = parsed.distribution;
    instance.scoreVersion = parsed.scoreVersion;
    instance.indicators = (parsed.indicators as Record<string, any>) ?? null;
    instance.calculatedAt = parsed.calculatedAt;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  updateMetrics(params: {
    score: number;
    averageRating: number;
    totalReviews: number;
    distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
    scoreVersion: number;
    indicators?: Record<string, any> | null;
    calculatedAt: string;
  }): void {
    this.score = params.score;
    this.averageRating = params.averageRating;
    this.totalReviews = params.totalReviews;
    this.distribution = params.distribution;
    this.scoreVersion = params.scoreVersion;
    this.indicators = params.indicators ?? null;
    this.calculatedAt = params.calculatedAt;
    this.dateUpdated = getNowISO();

    zodValidate(EmpresaScore.entityName, EmpresaScoreSchema, this);
  }
}
