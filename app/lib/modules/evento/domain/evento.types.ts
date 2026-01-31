import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/modules/calendario-letivo";

/**
 * Interface que define a estrutura de um Evento
 */
export interface IEvento {
  id: IdUuid;
  nome: string | null;
  rrule: string;
  cor: string | null;
  dataInicio: ScalarDateTimeString | null;
  dataFim: ScalarDateTimeString | null;
  calendario: ICalendarioLetivo;
  ambiente: IAmbiente | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Interface para criação de Evento
 */
export interface IEventoCreate {
  nome?: string | null;
  rrule: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario: { id: IdUuid };
  ambiente?: { id: IdUuid } | null;
}

/**
 * Interface para atualização de Evento
 */
export interface IEventoUpdate {
  nome?: string | null;
  rrule?: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario?: { id: IdUuid };
  ambiente?: { id: IdUuid } | null;
}
