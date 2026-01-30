import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";

/**
 * Tipagem da entidade Disponibilidade
 * Define a estrutura de dados sem comportamento
 */
export interface IDisponibilidade {
  /** Identificador da disponibilidade (UUID) */
  id: IdUuid;

  /** Data de inicio */
  dataInicio: ScalarDateTimeString;

  /** Data de termino */
  dataFim: ScalarDateTimeString | null;

  /** Data de criacao do registro */
  dateCreated: ScalarDateTimeString;

  /** Data de atualizacao do registro */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusao do registro (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Interface para criacao de Disponibilidade
 */
export interface IDisponibilidadeCreate {
  dataInicio: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}

/**
 * Interface para atualizacao de Disponibilidade
 */
export interface IDisponibilidadeUpdate {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}
