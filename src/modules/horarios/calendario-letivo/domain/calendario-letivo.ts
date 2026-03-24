import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioLetivoCreateSchema,
  CalendarioLetivoSchema,
  CalendarioLetivoUpdateSchema,
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
    const parsed = zodValidate(
      CalendarioLetivo.entityName,
      CalendarioLetivoCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioLetivo();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.ano = parsed.ano;
    instance.campus = parsed.campus as unknown as ICampus;
    instance.ofertaFormacao = parsed.ofertaFormacao
      ? (parsed.ofertaFormacao as unknown as IOfertaFormacao)
      : null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioLetivo {
    const parsed = zodValidate(CalendarioLetivo.entityName, CalendarioLetivoSchema, dados);

    const instance = new CalendarioLetivo();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.ano = parsed.ano;
    instance.campus = parsed.campus as unknown as ICampus;
    instance.ofertaFormacao = parsed.ofertaFormacao as unknown as IOfertaFormacao | null;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioLetivo.entityName,
      CalendarioLetivoUpdateSchema.domain,
      dados,
    );

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.ano !== undefined) this.ano = parsed.ano;

    this.dateUpdated = getNowISO();
  }
}
