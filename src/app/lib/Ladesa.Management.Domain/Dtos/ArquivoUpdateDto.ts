/**
 * Interface para atualização de Arquivo
 */
export interface ArquivoUpdateDto {
  name?: string;
  mimeType?: string;
  sizeBytes?: number;
  storageType?: string;
}
