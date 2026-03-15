import type { IdNumeric } from "@/domain/abstractions/scalars";

export class EstadoFindOneQuery {
  id!: IdNumeric;
  selection?: string[];
}
