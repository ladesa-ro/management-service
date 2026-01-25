import type { IArquivo } from "@/v2/core/arquivo/domain/arquivo.types";
import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de um ImagemArquivo
 */
export interface IImagemArquivo {
  id: string;
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: IImagem;
  arquivo: IArquivo;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Interface para criação de ImagemArquivo
 */
export interface IImagemArquivoCreate {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: { id: string };
  arquivo: { id: string };
}
