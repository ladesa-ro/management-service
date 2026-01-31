import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";

/**
 * Interface que define a estrutura de um Arquivo
 */
export interface IArquivo {
  id: IdUuid;
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
