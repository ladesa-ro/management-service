import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IArquivo } from "@/modules/arquivo/domain/arquivo.types";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de um ImagemArquivo
 */
export interface IImagemArquivo {
  id: IdUuid;
  largura: number;
  altura: number;
  formato: string;
  mimeType: string;
  imagem: IImagem;
  arquivo: IArquivo;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
