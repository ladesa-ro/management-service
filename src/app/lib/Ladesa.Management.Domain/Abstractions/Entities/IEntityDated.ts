import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars/ScalarDateTimeString";

export interface IEntityDated {
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}
