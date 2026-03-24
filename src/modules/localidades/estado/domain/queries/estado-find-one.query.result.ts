import { SharedFields } from "@/domain/abstractions";
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
