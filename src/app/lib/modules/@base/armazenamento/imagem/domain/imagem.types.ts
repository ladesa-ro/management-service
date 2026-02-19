import type { IImagemArquivo } from "@/modules/@base/armazenamento/imagem-arquivo/domain/imagem-arquivo.types";
import type { IEntityBase } from "@/modules/@shared";

/**
 * Tipagem da entidade Imagem
 * Define a estrutura de dados sem comportamento
 */
export interface IImagem extends IEntityBase {
  /** Descricao da imagem */
  descricao: string | null;

  /** Versoes da imagem (diferentes formatos/tamanhos) */
  versoes?: IImagemArquivo[];
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
