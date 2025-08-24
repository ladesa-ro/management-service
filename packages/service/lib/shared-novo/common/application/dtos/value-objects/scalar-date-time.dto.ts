import { Static, Type } from "@sinclair/typebox";
import { ScalarDateTime } from "@/shared-novo";

export const ScalarDateTimeSchema = Type.String({
  format: "date-time",
  description: "Data e hora (ISO 8601).",
});

export type ScalarDateTimeDto = ScalarDateTime & Static<typeof ScalarDateTimeSchema>;
