import type { ScalarDateTimeString } from "@/domain/abstractions/scalars";

/**
 * Campos de data comuns para query results
 */

export class DatedQueryResult {
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;
}
