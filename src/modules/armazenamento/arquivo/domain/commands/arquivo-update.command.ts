import { ArquivoFields } from "../arquivo.fields";

export const ArquivoUpdateCommandFields = {
  name: ArquivoFields.name,
  mimeType: ArquivoFields.mimeType,
  sizeBytes: ArquivoFields.sizeBytes,
  storageType: ArquivoFields.storageType,
};

export class ArquivoUpdateCommand {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType?: string;
}
