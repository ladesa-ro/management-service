import type { ICalendarioLetivo } from "@/core/calendario-letivo";

export interface IHorarioGerado {
  id: string;
  status: string | null;
  tipo: string | null;
  dataGeracao: Date | null;
  vigenciaInicio: Date | null;
  vigenciaFim: Date | null;
  calendario: ICalendarioLetivo;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface IHorarioGeradoCreate {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: Date | null;
  vigenciaInicio?: Date | null;
  vigenciaFim?: Date | null;
  calendario: { id: string };
}
