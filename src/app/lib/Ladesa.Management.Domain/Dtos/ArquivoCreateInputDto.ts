export class ArquivoCreateInputDto {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType!: string;
}
