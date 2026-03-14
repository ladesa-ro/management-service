import type { IdNumeric } from "@/modules/@shared";
import { EstadoFindOneQueryResult } from "@/modules/localidades/estado";

export class CidadeFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  estado!: EstadoFindOneQueryResult;
}
