import type { IEntityBase } from "@/modules/@shared";

/**
 * Tipagem da entidade IntervaloDeTempo
 * Define a estrutura de dados sem comportamento
 */
export interface IIntervaloDeTempo extends IEntityBase {
  /** Horário de início do intervalo (formato HH:MM ou HH:MM:SS) */
  periodoInicio: string;

  /** Horário de fim do intervalo (formato HH:MM ou HH:MM:SS) */
  periodoFim: string;
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
