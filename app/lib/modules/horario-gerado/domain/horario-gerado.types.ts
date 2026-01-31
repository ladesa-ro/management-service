import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { ICalendarioLetivo } from "@/modules/calendario-letivo";

export interface IHorarioGerado {
  id: IdUuid;
  status: string | null;
  tipo: string | null;
  dataGeracao: ScalarDateTimeString | null;
  vigenciaInicio: ScalarDateTimeString | null;
  vigenciaFim: ScalarDateTimeString | null;
  calendario: ICalendarioLetivo;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IHorarioGeradoCreate {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDateTimeString | null;
  vigenciaInicio?: ScalarDateTimeString | null;
  vigenciaFim?: ScalarDateTimeString | null;
  calendario: { id: IdUuid };
}

export interface IHorarioGeradoUpdate {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDateTimeString | null;
  vigenciaInicio?: ScalarDateTimeString | null;
  vigenciaFim?: ScalarDateTimeString | null;
  calendario?: { id: IdUuid };
}
