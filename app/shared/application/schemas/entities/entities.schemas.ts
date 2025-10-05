import { Type } from "typebox";
import { ScalarDateTimeDtoSchema, ScalarIdNumericDtoSchema, ScalarIdUuidDtoSchema } from "../../dtos";

export const BaseEntityDtoSchema = Type.Object(
  {},
  {
    additionalProperties: false,
  },
);

export const BaseEntityIdUuidDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  id: ScalarIdUuidDtoSchema,
});

export const BaseEntityIdNumericDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  id: ScalarIdNumericDtoSchema,
});

export const BaseEntityDatedDtoSchema = Type.Interface([BaseEntityDtoSchema], {
  dateCreated: ScalarDateTimeDtoSchema,
  dateUpdated: ScalarDateTimeDtoSchema,
  dateDeleted: Type.Union([ScalarDateTimeDtoSchema, Type.Null()]),
});
