import { createFieldMetadata, EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { ArquivoFields } from "../arquivo.fields";

export const ArquivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ArquivoFields,
  name: createFieldMetadata({ description: "Nome do arquivo", nullable: true }),
  mimeType: createFieldMetadata({ description: "Formato do arquivo", nullable: true }),
  sizeBytes: createFieldMetadata({ description: "Tamanho do arquivo (em bytes)", nullable: true }),
};

export class ArquivoFindOneQueryResult extends EntityQueryResult {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
}
