import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";

/**
 * Tipagem da entidade Imagem
 * Define a estrutura de dados sem comportamento
 */
export interface IImagem {
  /** Identificador da imagem (uuid) */
  id: IdUuid;

  /** Descricao da imagem */
  descricao: string | null;

  /** Data e hora da criacao do registro */
  dateCreated: ScalarDateTimeString;

  /** Data e hora da alteracao do registro */
  dateUpdated: ScalarDateTimeString;

  /** Data e hora da exclusao do registro */
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessarios para criar uma imagem
 */
export interface IImagemCreate {
  descricao?: string | null;
}
