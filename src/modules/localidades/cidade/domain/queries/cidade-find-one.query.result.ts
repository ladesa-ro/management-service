import { SharedFields } from "@/domain/abstractions";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { EstadoFindOneQueryResult } from "@/modules/localidades/estado";
import { CidadeFields } from "../cidade.fields";

export const CidadeFindOneQueryResultFields = {
  id: SharedFields.idNumeric,
  ...CidadeFields,
};

export class CidadeFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  estado!: EstadoFindOneQueryResult;
}

defineModel("CidadeFindOneQueryResult", [
  ...fieldsToProperties(CidadeFindOneQueryResultFields),
  referenceProperty("estado", "EstadoFindOneQueryResult"),
]);
