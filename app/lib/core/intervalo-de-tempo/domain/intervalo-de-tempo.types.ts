import type { IdUuid } from "@/core/@shared";

/**
 * Tipagem da entidade IntervaloDeTempo
 * Define a estrutura de dados sem comportamento
 */
export interface IIntervaloDeTempo {
  /** Identificador do intervalo de tempo (UUID) */
  id: IdUuid;

  /** Horário de início do intervalo (formato HH:MM ou HH:MM:SS) */
  periodoInicio: string;

  /** Horário de fim do intervalo (formato HH:MM ou HH:MM:SS) */
  periodoFim: string;

  /** Data de criação do registro */
  dateCreated: Date;

  /** Data de atualização do registro */
  dateUpdated: Date;

  /** Data de exclusão do registro (soft delete) */
  dateDeleted: Date | null;
}

/**
 * Interface para criação de Intervalo de Tempo
 */
export interface IIntervaloDeTempoCreate {
  periodoInicio: string;
  periodoFim: string;
}

/**
 * Interface para atualização de Intervalo de Tempo
 */
export interface IIntervaloDeTempoUpdate {
  periodoInicio?: string;
  periodoFim?: string;
}
