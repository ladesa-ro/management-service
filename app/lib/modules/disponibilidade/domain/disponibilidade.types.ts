import type { IEntityBase, ScalarDateTimeString } from "@/modules/@shared";

/**
 * Tipagem da entidade Disponibilidade
 * Define a estrutura de dados sem comportamento
 */
export interface IDisponibilidade extends IEntityBase {
  /** Data de inicio */
  dataInicio: ScalarDateTimeString;

  /** Data de termino */
  dataFim: ScalarDateTimeString | null;
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
