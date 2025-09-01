import { Static, Type } from "@sinclair/typebox";
import { ScalarIntId } from "@/shared";

export const ScalarIntIdSchema = Type.Number({
  minimum: 1,
  multipleOf: 1,
  description: "Identificador numérico.",
});

export type ScalarIntIdDto = ScalarIntId & Static<typeof ScalarIntIdSchema>;
