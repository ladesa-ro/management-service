import { SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import { defineModel } from "@/domain/abstractions/metadata/model-registry";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import { EstadoFields } from "../estado.fields";

export const EstadoFindOneQueryResultFields = {
  id: SharedFields.idNumeric,
  ...EstadoFields,
};

export class EstadoFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  sigla!: string;
}

defineModel("EstadoFindOneQueryResult", [...fieldsToProperties(EstadoFindOneQueryResultFields)]);
