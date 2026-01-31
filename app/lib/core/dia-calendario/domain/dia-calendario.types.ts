import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICalendarioLetivo } from "@/core/calendario-letivo";

export interface IDiaCalendario {
  id: IdUuid;
  data: ScalarDateTimeString;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: ICalendarioLetivo;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
