import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";

/**
 * Interface que define a estrutura de um Arquivo
 */
export interface IArquivo extends IEntityBase {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}

/**
 * Interface para criação de Arquivo
 */
export interface IArquivoCreate {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}

/**
 * Interface para atualização de Arquivo
 */
export interface IArquivoUpdate {
  name?: string;
  mimeType?: string;
  sizeBytes?: number;
  storageType?: string;
}
