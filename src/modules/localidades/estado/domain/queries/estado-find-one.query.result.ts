import type { IdNumeric } from "@/domain/abstractions/scalars";

export class EstadoFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  sigla!: string;
}
