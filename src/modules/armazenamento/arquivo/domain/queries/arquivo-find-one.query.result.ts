import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ArquivoFields } from "../arquivo.fields";

export const ArquivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ArquivoFields,
};

export class ArquivoFindOneQueryResult extends EntityQueryResult {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
}
