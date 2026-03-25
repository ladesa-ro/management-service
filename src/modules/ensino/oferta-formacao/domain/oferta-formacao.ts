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

export type IOfertaFormacaoPeriodoEtapa = {
  nome: string;
  cor: string;
};

export type IOfertaFormacaoPeriodo = {
  numeroPeriodo: number;
  etapas: IOfertaFormacaoPeriodoEtapa[];
};

export class OfertaFormacao {
  static readonly entityName = "OfertaFormacao";

  id!: IdUuid;
  nome!: string;
  slug!: string;
  duracaoPeriodoEmMeses!: number;

  modalidade!: { id: string };
  campus!: { id: string };
  niveisFormacoes!: Array<{ id: string }>;
  periodos!: IOfertaFormacaoPeriodo[];

  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): OfertaFormacao {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoCreateSchema.domain, dados);

    const instance = new OfertaFormacao();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses;
    instance.modalidade = parsed.modalidade;
    instance.campus = parsed.campus;
    instance.niveisFormacoes = parsed.niveisFormacoes;
    instance.periodos = parsed.periodos;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: IOfertaFormacao): OfertaFormacao {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoSchema, dados);

    const instance = new OfertaFormacao();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses;
    instance.modalidade = parsed.modalidade;
    instance.campus = parsed.campus;
    instance.niveisFormacoes = parsed.niveisFormacoes;
    instance.periodos = parsed.periodos;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(OfertaFormacao.entityName, OfertaFormacaoUpdateSchema.domain, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.slug !== undefined) this.slug = parsed.slug;
    if (parsed.duracaoPeriodoEmMeses !== undefined)
      this.duracaoPeriodoEmMeses = parsed.duracaoPeriodoEmMeses;
    if (parsed.modalidade !== undefined) this.modalidade = parsed.modalidade;
    if (parsed.campus !== undefined) this.campus = parsed.campus;
    if (parsed.niveisFormacoes !== undefined) this.niveisFormacoes = parsed.niveisFormacoes;
    if (parsed.periodos !== undefined) this.periodos = parsed.periodos;

    this.dateUpdated = getNowISO();

    zodValidate(OfertaFormacao.entityName, OfertaFormacaoSchema, this);
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
