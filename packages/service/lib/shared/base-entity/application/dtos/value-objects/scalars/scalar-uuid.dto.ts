import { Static, Type } from "@sinclair/typebox";
import { ScalarUuid } from "@/shared";

export const ScalarUuidSchema = Type.String({
  format: "uuid",
  description: "Identificador Único Universal.",
});

export type ScalarUuidDto = ScalarUuid & Static<typeof ScalarUuidSchema>;
