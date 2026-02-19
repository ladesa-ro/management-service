import { ScalarDateTimeString } from "@/modules/@shared";

/**
 * Campos de data comuns para outputs
 */
export class DatedOutputDto {
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;
}
