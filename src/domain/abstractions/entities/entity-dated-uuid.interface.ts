import type { ScalarDateTimeString } from "../scalars/scalar-date-time-string";

export interface IEntityDatedUuid {
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}
