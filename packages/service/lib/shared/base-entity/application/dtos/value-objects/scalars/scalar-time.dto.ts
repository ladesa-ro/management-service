import { Static, Type } from "@sinclair/typebox";
import { ScalarTime } from "@/shared";

export const ScalarTimeSchema = Type.String({
  format: "time",
  description: "Hora (ISO 8601).",
});

export type ScalarTimeDto = ScalarTime & Static<typeof ScalarTimeSchema>;
