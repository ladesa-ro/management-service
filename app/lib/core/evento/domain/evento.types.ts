import type { ICalendarioLetivo } from "@/core/calendario-letivo";
import type { IAmbiente } from "@/core/ambiente/domain/ambiente.types";

/**
 * Interface que define a estrutura de um Evento
 */
export interface IEvento {
  id: string;
  nome: string | null;
  rrule: string;
  cor: string | null;
  data_inicio: Date | null;
  data_fim: Date | null;
  calendario: ICalendarioLetivo;
  ambiente: IAmbiente | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Interface para criação de Evento
 */
export interface IEventoCreate {
  nome?: string | null;
  rrule: string;
  cor?: string | null;
  data_inicio?: Date | null;
  data_fim?: Date | null;
  calendario: { id: string };
  ambiente?: { id: string } | null;
}

/**
 * Interface para atualização de Evento
 */
export interface IEventoUpdate {
  nome?: string | null;
  rrule?: string;
  cor?: string | null;
  data_inicio?: Date | null;
  data_fim?: Date | null;
  calendario?: { id: string };
  ambiente?: { id: string } | null;
}
