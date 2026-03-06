/**
 * Interface para criação de Arquivo
 */
export interface ArquivoCreateDto {
  name: string;
  mimeType: string;
  sizeBytes: number;
  storageType: string;
}
