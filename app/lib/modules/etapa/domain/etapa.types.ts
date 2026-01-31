import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { ICalendarioLetivo } from "@/modules/calendario-letivo";

export interface IEtapa {
  id: IdUuid;
  numero: number | null;
  dataInicio: ScalarDateTimeString;
  dataTermino: ScalarDateTimeString;
  cor: string | null;
  calendario: ICalendarioLetivo;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IEtapaCreate {
  numero?: number | null;
  dataInicio: ScalarDateTimeString;
  dataTermino: ScalarDateTimeString;
  cor?: string | null;
  calendario: { id: IdUuid };
}

export interface IEtapaUpdate {
  numero?: number | null;
  dataInicio?: ScalarDateTimeString;
  dataTermino?: ScalarDateTimeString;
  cor?: string | null;
  calendario?: { id: IdUuid };
}
