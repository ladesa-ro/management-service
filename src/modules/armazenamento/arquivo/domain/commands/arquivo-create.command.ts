import { ArquivoFields } from "../arquivo.fields";

export const ArquivoCreateCommandFields = {
  name: ArquivoFields.name,
  mimeType: ArquivoFields.mimeType,
  sizeBytes: ArquivoFields.sizeBytes,
  storageType: ArquivoFields.storageType,
};

export class ArquivoCreateCommand {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType!: string;
}
