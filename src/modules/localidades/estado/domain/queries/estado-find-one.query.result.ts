import type { IdNumeric } from "@/modules/@shared";

export class EstadoFindOneQueryResult {
  id!: IdNumeric;
  nome!: string;
  sigla!: string;
}
