import { ScalarDateTimeString } from "@/modules/@shared";

/**
 * Campos de data comuns para query results
 */
export class DatedQueryResult {
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;
}
