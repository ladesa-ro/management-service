import { ScalarDateTimeString } from "@/core/@shared";

/**
 * Campos de data comuns para outputs
 */
export class DatedOutput {
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;
}
