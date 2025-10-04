import { Type } from "typebox";
import type { ScalarDate, ScalarDateTime, ScalarIdNumeric, ScalarIdUuid, ScalarTime } from "../../../domain";

export type ScalarIdUuidDto = Type.Static<typeof ScalarIdUuidDtoSchema> & ScalarIdUuid;
export const ScalarIdUuidDtoSchema = Type.String({
  format: "uuid",
});

export type ScalarIdNumericDto = Type.Static<typeof ScalarIdNumericDtoSchema> & ScalarIdNumeric;
export const ScalarIdNumericDtoSchema = Type.Integer({
  minimum: 1,
});

export type ScalarTimeDto = Type.Static<typeof ScalarTimeDtoSchema> & ScalarTime;
export const ScalarTimeDtoSchema = Type.String({
  format: "time",
});

export type ScalarDateDto = Type.Static<typeof ScalarDateDtoSchema> & ScalarDate;
export const ScalarDateDtoSchema = Type.String({
  format: "date",
});

export type ScalarDateTimeDto = Type.Static<typeof ScalarDateTimeDtoSchema> & ScalarDateTime;
export const ScalarDateTimeDtoSchema = Type.String({
  format: "date-time",
});
