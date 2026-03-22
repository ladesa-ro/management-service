import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { zodValidate } from "@/shared/validation/index";
import type { CalendarioLetivo, ICalendarioLetivo } from "./calendario-letivo";
import {
  calendarioLetivoDiaSchema,
  calendarioLetivoDiaUpdateSchema,
} from "./calendario-letivo-dia.schemas";

export const TIPO_CALENDARIO_LETIVO_DIA_VALUES = [
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
] as const;

export type TipoCalendarioLetivoDia = (typeof TIPO_CALENDARIO_LETIVO_DIA_VALUES)[number];

export interface ICalendarioLetivoDia extends IEntityBaseUuid {
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: ICalendarioLetivo;
}

export interface ICalendarioLetivoDiaUpdate {
  data?: ScalarDateTimeString;
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
}

export class CalendarioLetivoDia implements IEntityBaseUuid {
  static readonly entityName = "CalendarioLetivoDia";

  id!: IdUuid;
  data!: ScalarDateTimeString;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static load(dados: Record<string, any>): CalendarioLetivoDia {
    const instance = Object.create(CalendarioLetivoDia.prototype) as CalendarioLetivoDia;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.data !== undefined) instance.data = dados.data;
    if (dados.diaLetivo !== undefined) instance.diaLetivo = dados.diaLetivo;
    if (dados.feriado !== undefined) instance.feriado = dados.feriado;
    if (dados.diaPresencial !== undefined) instance.diaPresencial = dados.diaPresencial;
    if (dados.tipo !== undefined) instance.tipo = dados.tipo;
    if (dados.extraCurricular !== undefined) instance.extraCurricular = dados.extraCurricular;
    if (dados.calendario !== undefined) instance.calendario = dados.calendario;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioLetivoDia.entityName,
      calendarioLetivoDiaUpdateSchema,
      dados,
    );

    if (parsed.data !== undefined) this.data = parsed.data;
    if (parsed.tipo !== undefined) this.tipo = parsed.tipo;
    if (parsed.diaLetivo !== undefined) this.diaLetivo = parsed.diaLetivo;
    if (parsed.feriado !== undefined) this.feriado = parsed.feriado;
    if (parsed.diaPresencial !== undefined) this.diaPresencial = parsed.diaPresencial;
    if (parsed.extraCurricular !== undefined) this.extraCurricular = parsed.extraCurricular;

    this.dateUpdated = new Date().toISOString();
    zodValidate(CalendarioLetivoDia.entityName, calendarioLetivoDiaSchema, this);
  }
}
