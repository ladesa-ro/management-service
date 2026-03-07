import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class DatedOutputDto {
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;
}
