import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import { zodValidate } from "@/shared/validation/index";
import {
  calendarioLetivoCreateSchema,
  calendarioLetivoUpdateSchema,
} from "./calendario-letivo.schemas";

export interface ICalendarioLetivo extends IEntityBaseUuid {
  nome: string;
  ano: number;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao | null;
}

export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}

export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid } | null;
}

export class CalendarioLetivo implements IEntityBaseUuid {
  static readonly entityName = "CalendarioLetivo";

  id!: IdUuid;
  nome!: string;
  ano!: number;
  campus!: ICampus;
  ofertaFormacao!: IOfertaFormacao | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ICalendarioLetivoCreate): CalendarioLetivo {
    const parsed = zodValidate(CalendarioLetivo.entityName, calendarioLetivoCreateSchema, dados);

    const instance = new CalendarioLetivo();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.ano = parsed.ano;
    instance.ofertaFormacao = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: Record<string, any>): CalendarioLetivo {
    const instance = Object.create(CalendarioLetivo.prototype) as CalendarioLetivo;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.ano !== undefined) instance.ano = dados.ano;
    if (dados.campus !== undefined) instance.campus = dados.campus;
    if (dados.ofertaFormacao !== undefined) instance.ofertaFormacao = dados.ofertaFormacao;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(CalendarioLetivo.entityName, calendarioLetivoUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.ano !== undefined) this.ano = parsed.ano;

    this.dateUpdated = new Date().toISOString();
  }
}
