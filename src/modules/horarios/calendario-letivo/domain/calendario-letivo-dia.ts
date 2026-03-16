import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { CalendarioLetivo, ICalendarioLetivo } from "./calendario-letivo";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

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

  validate(): void {
    const { result, rules } = createValidator("CalendarioLetivoDia");
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    rules.required(this.tipo, "tipo");
    throwIfInvalid("CalendarioLetivoDia", result);
  }

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

  update(dados: ICalendarioLetivoDiaUpdate): void {
    if (dados.data !== undefined) this.data = dados.data;
    if (dados.tipo !== undefined) this.tipo = dados.tipo;
    if (dados.diaLetivo !== undefined) this.diaLetivo = dados.diaLetivo;
    if (dados.feriado !== undefined) this.feriado = dados.feriado;
    if (dados.diaPresencial !== undefined) this.diaPresencial = dados.diaPresencial;
    if (dados.extraCurricular !== undefined) this.extraCurricular = dados.extraCurricular;
    touchUpdated(this);
    this.validate();
  }
}
