import type { IdUuid, IEntityBase, ScalarDateTimeString } from "@/modules/@shared";
import type { ICalendarioLetivo } from "@/modules/sisgha/calendario-letivo";

export interface IEtapa extends IEntityBase {
  numero: number | null;
  dataInicio: ScalarDateTimeString;
  dataTermino: ScalarDateTimeString;
  cor: string | null;
  calendario: ICalendarioLetivo;
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
