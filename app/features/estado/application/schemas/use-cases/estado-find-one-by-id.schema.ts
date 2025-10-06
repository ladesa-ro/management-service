import { Type } from "typebox";
import { EstadoSchema } from "@/features/estado/application/schemas/entities";
import { createAppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export const EstadoFindOneByIdInputSchema = createAppSchema("EstadoFindOneByIdInput", (context) => {
  const estadoDtoSchema = context.getSchema(EstadoSchema);

  return Type.Object({
    id: Type.Index(estadoDtoSchema, ["id"]),
  });
});

export const EstadoFindOneByIdOutputSchema = createAppSchema("EstadoFindOneByIdOutput", (context) => {
  const estadoDtoSchema = context.getSchema(EstadoSchema);

  return Type.Interface([estadoDtoSchema], {});
});
