import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  EmpresaAvaliacaoCreateSchema,
  EmpresaAvaliacaoSchema,
  EmpresaAvaliacaoUpdateSchema,
} from "./empresa-avaliacao.schemas";
import { ReviewRelevanceService } from "./services/review-relevance.service";

export interface IEmpresaAvaliacao {
  id: string;
  empresa: { id: string };
  estagiario: { id: string };
  rating: number;
  comentario: string | null;
  relevanceScore: number;
  likesCount: number;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class EmpresaAvaliacao {
  static readonly entityName = "EmpresaAvaliacao";

  id!: IdUuid;
  empresa!: { id: string };
  estagiario!: { id: string };
  rating!: number;
  comentario!: string | null;
  relevanceScore!: number;
  likesCount!: number;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static create(dados: unknown): EmpresaAvaliacao {
    const parsed = zodValidate(
      EmpresaAvaliacao.entityName,
      EmpresaAvaliacaoCreateSchema.domain,
      dados,
    );

    const instance = new EmpresaAvaliacao();
    instance.id = generateUuidV7();
    instance.empresa = parsed.empresa;
    instance.estagiario = parsed.estagiario;
    instance.rating = parsed.rating;
    instance.comentario = parsed.comentario ?? null;
    instance.likesCount = 0;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    instance.relevanceScore = ReviewRelevanceService.calculate({
      likesCount: instance.likesCount,
      dateCreated: instance.dateCreated,
      comentario: instance.comentario,
    });

    return instance;
  }

  static load(dados: unknown): EmpresaAvaliacao {
    const parsed = zodValidate(EmpresaAvaliacao.entityName, EmpresaAvaliacaoSchema, dados);

    const instance = new EmpresaAvaliacao();
    instance.id = parsed.id;
    instance.empresa = parsed.empresa;
    instance.estagiario = parsed.estagiario;
    instance.rating = parsed.rating;
    instance.comentario = parsed.comentario ?? null;
    instance.relevanceScore = parsed.relevanceScore;
    instance.likesCount = parsed.likesCount;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      EmpresaAvaliacao.entityName,
      EmpresaAvaliacaoUpdateSchema.domain,
      dados,
    );

    if (parsed.rating !== undefined) this.rating = parsed.rating;
    if (parsed.comentario !== undefined) this.comentario = parsed.comentario;

    this.dateUpdated = getNowISO();

    this.recalculateRelevance();

    zodValidate(EmpresaAvaliacao.entityName, EmpresaAvaliacaoSchema, this);
  }

  recalculateRelevance(referenceDate?: Date | string): void {
    this.relevanceScore = ReviewRelevanceService.calculate(
      {
        likesCount: this.likesCount,
        dateCreated: this.dateCreated,
        comentario: this.comentario,
      },
      { referenceDate },
    );
  }

  updateLikesCount(newCount: number): void {
    this.likesCount = Math.max(0, newCount);
    this.dateUpdated = getNowISO();
    this.recalculateRelevance();
  }

  softDelete(): void {
    this.dateDeleted = getNowISO();
    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.ativo && this.dateDeleted === null;
  }
}
