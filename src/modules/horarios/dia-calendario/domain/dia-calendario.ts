import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { CalendarioLetivo, ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export const TIPO_DIA_CALENDARIO_VALUES = [
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
] as const;

export type TipoDiaCalendario = (typeof TIPO_DIA_CALENDARIO_VALUES)[number];

export interface IDiaCalendario extends IEntityBaseUuid {
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: ICalendarioLetivo;
}

export interface IDiaCalendarioCreate {
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: { id: IdUuid };
}

export interface IDiaCalendarioUpdate {
  data?: ScalarDateTimeString;
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
  calendario?: { id: IdUuid };
}

export class DiaCalendario implements IEntityBaseUuid {
  static readonly entityName = "DiaCalendario";

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

  constructor(dados: {
    data: ScalarDateTimeString;
    diaLetivo: boolean;
    feriado: string;
    diaPresencial: boolean;
    tipo: string;
    extraCurricular: boolean;
  }) {
    this.id = generateUuidV7();
    this.data = dados.data;
    this.diaLetivo = dados.diaLetivo;
    this.feriado = dados.feriado;
    this.diaPresencial = dados.diaPresencial;
    this.tipo = dados.tipo;
    this.extraCurricular = dados.extraCurricular;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("DiaCalendario");
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    rules.required(this.tipo, "tipo");
    throwIfInvalid("DiaCalendario", result);
  }

  static create(dados: IDiaCalendarioCreate, validar: boolean = true): DiaCalendario {
    const instance = new DiaCalendario(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): DiaCalendario {
    const instance = Object.create(DiaCalendario.prototype) as DiaCalendario;
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

  update(dados: IDiaCalendarioUpdate): void {
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
