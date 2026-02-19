import type { IArquivo } from "@/modules/armazenamento/arquivo/domain/arquivo.types";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem.types";
import type { IdUuid, IEntityBase } from "@/modules/@shared";

/**
 * Interface que define a estrutura de um ImagemArquivo
 */
export interface IImagemArquivo extends IEntityBase {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: IImagem;
  arquivo: IArquivo;
}

/**
 * Interface para criação de ImagemArquivo
 */
export interface IImagemArquivoCreate {
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: { id: IdUuid };
  arquivo: { id: IdUuid };
}

/**
 * Interface para atualização de ImagemArquivo
 */
export interface IImagemArquivoUpdate {
  largura?: number;
  altura?: number;
  formato?: string;
  mimeType?: string;
}
