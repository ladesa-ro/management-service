/**
 * Interface que define a estrutura de um Arquivo
 */
export interface IArquivo {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
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
