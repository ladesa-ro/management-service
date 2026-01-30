import type { ICalendarioLetivo } from "@/core/calendario-letivo";

export interface IDiaCalendario {
  id: string;
  data: Date;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: ICalendarioLetivo;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IDiaCalendarioCreate {
  data: Date;
  diaLetivo: boolean;
  feriado: string;
  diaPresencial: boolean;
  tipo: string;
  extraCurricular: boolean;
  calendario: { id: string };
}
