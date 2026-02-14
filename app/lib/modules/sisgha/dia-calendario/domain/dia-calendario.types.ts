import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { ICalendarioLetivo } from "@/modules/sisgha/calendario-letivo";

export const TIPO_DIA_CALENDARIO_VALUES = [
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
] as const;

export type TipoDiaCalendario = (typeof TIPO_DIA_CALENDARIO_VALUES)[number];

export interface IDiaCalendario extends IEntityBase {
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
