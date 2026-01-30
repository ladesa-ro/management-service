import type { ICalendarioLetivo } from "@/core/calendario-letivo";

export interface IEtapa {
  id: string;
  numero: number | null;
  dataInicio: Date;
  dataTermino: Date;
  cor: string | null;
  calendario: ICalendarioLetivo;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IEtapaCreate {
  numero?: number | null;
  dataInicio: Date;
  dataTermino: Date;
  cor?: string | null;
  calendario: { id: string };
}
