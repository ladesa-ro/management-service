import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IImagemArquivo } from "@/modules/imagem-arquivo/domain/imagem-arquivo.types";

/**
 * Tipagem da entidade Imagem
 * Define a estrutura de dados sem comportamento
 */
export interface IImagem {
  /** Identificador da imagem (uuid) */
  id: IdUuid;

  /** Descricao da imagem */
  descricao: string | null;

  /** Versoes da imagem (diferentes formatos/tamanhos) */
  versoes?: IImagemArquivo[];

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

/**
 * Dados para atualização de imagem
 */
export interface IImagemUpdate {
  descricao?: string | null;
}
