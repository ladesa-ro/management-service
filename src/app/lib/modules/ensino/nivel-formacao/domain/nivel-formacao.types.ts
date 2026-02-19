import type { IEntityBase } from "@/modules/@shared";

/**
 * Tipagem da entidade NivelFormacao
 * Define a estrutura de dados sem comportamento
 */
export interface INivelFormacao extends IEntityBase {
  /** Slug para identificacao (ex: tecnico, graduacao, pos-graduacao) */
  slug: string;
}

/**
 * Tipagem para criacao de NivelFormacao
 */
export interface INivelFormacaoCreate {
  slug: string;
}

/**
 * Tipagem para atualizacao de NivelFormacao
 */
export interface INivelFormacaoUpdate {
  slug?: string;
}
