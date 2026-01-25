/**
 * Interface que define a estrutura de um Intervalo de Tempo
 */
export interface IIntervaloDeTempo {
  id: string;
  periodoInicio: string;
  periodoFim: string;
  dateCreated: Date;
  dateUpdated: Date;
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
