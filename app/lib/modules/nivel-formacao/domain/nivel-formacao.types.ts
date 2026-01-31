import { IdUuid, ScalarDateTimeString } from "@/modules/@shared";

/**
 * Tipagem da entidade NivelFormacao
 * Define a estrutura de dados sem comportamento
 */
export interface INivelFormacao {
  /** Identificador UUID do nivel de formacao */
  id: IdUuid;

  /** Slug para identificacao (ex: tecnico, graduacao, pos-graduacao) */
  slug: string;

  /** Data de criacao */
  dateCreated: ScalarDateTimeString;

  /** Data de atualizacao */
  dateUpdated: ScalarDateTimeString;

  /** Data de exclusao (soft delete) */
  dateDeleted: ScalarDateTimeString | null;
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
