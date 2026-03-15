import type { IdNumeric } from "@/domain/abstractions/scalars";

export class CidadeFindOneQuery {
  id!: IdNumeric;
  selection?: string[];
}
