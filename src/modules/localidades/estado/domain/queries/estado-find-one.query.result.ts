import { SharedFields } from "@/domain/abstractions";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import { defineModel } from "@/infrastructure.database/typeorm/metadata/model-registry";
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
