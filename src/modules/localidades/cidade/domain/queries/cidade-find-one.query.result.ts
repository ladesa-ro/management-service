import type { IdNumeric } from "@/domain/abstractions/scalars";
import { EstadoFindOneQueryResult } from "@/modules/localidades/estado";

export class CidadeFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  estado!: EstadoFindOneQueryResult;
}
