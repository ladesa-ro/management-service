import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";

/**
 * Tipagem da entidade Modalidade
 * Define a estrutura de dados sem comportamento
 */
export interface IModalidade {
  /** Identificador UUID da modalidade */
  id: IdUuid;

  /** Nome da modalidade */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;

  /** Data de criacao */
  dateCreated: ScalarDateTimeString;

  /** Data de atualizacao */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusao (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Tipagem para criacao de Modalidade
 */
export interface IModalidadeCreate {
  nome: string;
  slug: string;
}

/**
 * Tipagem para atualizacao de Modalidade
 */
export interface IModalidadeUpdate {
  nome?: string;
  slug?: string;
}
