import { Type } from "typebox";
import { BaseEntityIdNumericDtoSchema } from "@/shared";
import { createAppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export const EstadoSchema = createAppSchema("Estado", () => {
  return Type.Interface([BaseEntityIdNumericDtoSchema], {
    nome: Type.String(),
    sigla: Type.String(),
  });
});
