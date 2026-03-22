import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
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

defineModel("ArquivoFindOneQueryResult", [
  ...fieldsToProperties(ArquivoFindOneQueryResultFields),
  ...commonProperties.dated,
]);
