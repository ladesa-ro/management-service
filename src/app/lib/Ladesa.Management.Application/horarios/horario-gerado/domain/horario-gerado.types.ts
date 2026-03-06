import type {
  IdUuid,
  IEntityBase,
  ScalarDateTimeString,
} from "@/Ladesa.Management.Application/@shared";
import type { ICalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";

export interface IHorarioGerado extends IEntityBase {
  status: string | null;
  tipo: string | null;
  dataGeracao: ScalarDateTimeString | null;
  vigenciaInicio: ScalarDateTimeString | null;
  vigenciaFim: ScalarDateTimeString | null;
  calendario: ICalendarioLetivo;
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
