/**
 * Interface que define a estrutura de uma Disponibilidade
 */
export interface IDisponibilidade {
  id: string;
  dataInicio: Date;
  dataFim: Date | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Interface para criação de Disponibilidade
 */
export interface IDisponibilidadeCreate {
  dataInicio: Date;
  dataFim?: Date | null;
}

/**
 * Interface para atualização de Disponibilidade
 */
export interface IDisponibilidadeUpdate {
  dataInicio?: Date;
  dataFim?: Date | null;
}
