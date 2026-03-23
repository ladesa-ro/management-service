import type { z } from "zod";
import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioLetivoDiaSchema,
  CalendarioLetivoDiaUpdateSchema,
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

export type ICalendarioLetivoDia = z.infer<typeof CalendarioLetivoDiaSchema>;

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
  calendario!: ICalendarioLetivoDia["calendario"];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static load(dados: unknown): CalendarioLetivoDia {
    const parsed = zodValidate(CalendarioLetivoDia.entityName, CalendarioLetivoDiaSchema, dados);

    const instance = new CalendarioLetivoDia();

    instance.id = parsed.id;
    instance.data = parsed.data;
    instance.diaLetivo = parsed.diaLetivo;
    instance.feriado = parsed.feriado;
    instance.diaPresencial = parsed.diaPresencial;
    instance.tipo = parsed.tipo;
    instance.extraCurricular = parsed.extraCurricular;
    instance.calendario = parsed.calendario;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioLetivoDia.entityName,
      CalendarioLetivoDiaUpdateSchema.domain,
      dados,
    );

    if (parsed.data !== undefined) this.data = parsed.data;
    if (parsed.tipo !== undefined) this.tipo = parsed.tipo;
    if (parsed.diaLetivo !== undefined) this.diaLetivo = parsed.diaLetivo;
    if (parsed.feriado !== undefined) this.feriado = parsed.feriado;
    if (parsed.diaPresencial !== undefined) this.diaPresencial = parsed.diaPresencial;
    if (parsed.extraCurricular !== undefined) this.extraCurricular = parsed.extraCurricular;

    this.dateUpdated = getNowISO();
    zodValidate(CalendarioLetivoDia.entityName, CalendarioLetivoDiaSchema, this);
  }
}
