import { SharedFields } from "@/domain/abstractions";
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
