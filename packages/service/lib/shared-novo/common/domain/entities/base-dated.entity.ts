import { BaseEntity, ScalarDateTime } from "@/shared-novo";

export type BaseDatedEntity = BaseEntity & {
  dateCreated: ScalarDateTime;
  dateUpdated: ScalarDateTime;
  dateDeleted: ScalarDateTime | null;
};
