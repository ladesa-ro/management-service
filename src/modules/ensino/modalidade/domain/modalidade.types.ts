import type { IEntityBase } from "@/modules/@shared";

/**
 * Tipagem da entidade Modalidade
 * Define a estrutura de dados sem comportamento
 */
export interface IModalidade extends IEntityBase {
  /** Nome da modalidade */
  nome: string;

  /** Slug para URL amigavel */
  slug: string;
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
