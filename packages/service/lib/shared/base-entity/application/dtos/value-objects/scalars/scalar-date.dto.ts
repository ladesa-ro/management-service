import { Static, Type } from "@sinclair/typebox";
import { ScalarDate } from "@/shared";

export const ScalarDateSchema = Type.String({
  format: "date",
  description: "Data (ISO 8601).",
});

export type ScalarDateDto = ScalarDate & Static<typeof ScalarDateSchema>;
