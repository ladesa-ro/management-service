import { Type } from "typebox";
import type { BaseEntity, BaseEntityDated, BaseEntityIdNumeric, BaseEntityIdUuid } from "../../../domain";
import { ScalarDateTimeDtoSchema, ScalarIdNumericDtoSchema, ScalarIdUuidDtoSchema } from "../scalars";

export type BaseEntityDto = Type.Static<typeof BaseEntityDtoSchema> & BaseEntity;
export const BaseEntityDtoSchema = Type.Object(
  {},
  {
    additionalProperties: false,
  },
);

export type BaseEntityIdUuidDto = Type.Static<typeof BaseEntityIdUuidDtoSchema> & BaseEntityIdUuid;
export const BaseEntityIdUuidDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  id: ScalarIdUuidDtoSchema,
});

export type BaseEntityIdNumericDto = Type.Static<typeof BaseEntityIdNumericDtoSchema> & BaseEntityIdNumeric;
export const BaseEntityIdNumericDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  id: ScalarIdNumericDtoSchema,
});

export type BaseEntityDatedDto = Type.Static<typeof BaseEntityDatedDtoSchema> & BaseEntityDated;
export const BaseEntityDatedDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  dateCreated: ScalarDateTimeDtoSchema,
  dateUpdated: ScalarDateTimeDtoSchema,
  dateDeleted: Type.Union([ScalarDateTimeDtoSchema, Type.Null()]),
});
