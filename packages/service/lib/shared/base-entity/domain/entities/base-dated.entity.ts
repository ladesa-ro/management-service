import { BaseEntity, ScalarDateTime } from "@/shared";

export type BaseDatedEntity = BaseEntity & {
  dateCreated: ScalarDateTime;
  dateUpdated: ScalarDateTime;
  dateDeleted: ScalarDateTime | null;
};
