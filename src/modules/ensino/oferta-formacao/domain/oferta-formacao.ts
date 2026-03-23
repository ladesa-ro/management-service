import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  OfertaFormacaoCreateSchema,
  OfertaFormacaoSchema,
  OfertaFormacaoUpdateSchema,
} from "./oferta-formacao.schemas";

export type IOfertaFormacao = z.infer<typeof OfertaFormacaoSchema>;

export class OfertaFormacao {
  static readonly entityName = "OfertaFormacao";

  id!: IdUuid;
  nome!: string;
  slug!: string;
  duracaoPeriodoEmMeses!: number | null;
  modalidade!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): OfertaFormacao {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoCreateSchema, dados);

    const instance = new OfertaFormacao();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses ?? null;
    instance.modalidade = parsed.modalidade ?? null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): OfertaFormacao {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoSchema, dados);

    const instance = new OfertaFormacao();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses ?? null;
    instance.modalidade = parsed.modalidade;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.slug !== undefined) this.slug = parsed.slug;
    if (parsed.duracaoPeriodoEmMeses !== undefined)
      this.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses ?? null;
    if (parsed.modalidade !== undefined) this.modalidade = parsed.modalidade ?? null;

    this.dateUpdated = getNowISO();

    zodValidate(OfertaFormacao.entityName, OfertaFormacaoSchema, this);
  }
}
