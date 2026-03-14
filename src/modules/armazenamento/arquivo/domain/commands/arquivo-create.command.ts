export class ArquivoCreateCommand {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType!: string;
}
