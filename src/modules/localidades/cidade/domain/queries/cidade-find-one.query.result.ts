import { SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import { defineModel, referenceProperty } from "@/domain/abstractions/metadata/model-registry";
import type { IdNumeric } from "@/domain/abstractions/scalars";
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
