import type { ScalarDateTime, ScalarIdNumeric, ScalarIdUuid } from "../scalars";

export type BaseEntity = Record<string, unknown>;

export type BaseEntityIdUuid = {
  id: ScalarIdUuid;
};

export type BaseEntityIdNumeric = {
  id: ScalarIdNumeric;
};

export type BaseEntityDated = {
  dateCreated: ScalarDateTime;
  dateUpdated: ScalarDateTime;
  dateDeleted: ScalarDateTime | null;
};
