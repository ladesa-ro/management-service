import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IArquivo } from "@/core/arquivo/domain/arquivo.types";
import type { IImagem } from "@/core/imagem/domain/imagem.types";

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
