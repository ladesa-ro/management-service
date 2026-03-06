import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { IArquivo } from "@/Ladesa.Management.Application/armazenamento/arquivo/domain/arquivo.types";
import type { IImagem } from "@/Ladesa.Management.Application/armazenamento/imagem/domain/imagem.types";

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
