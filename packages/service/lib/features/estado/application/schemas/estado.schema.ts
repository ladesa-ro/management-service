import { Type } from "@sinclair/typebox";
import { BaseEntityIntIdSchema, registerSchema, SchemaId } from "@/shared";

export const EstadoSchema = registerSchema(
  SchemaId.Estado,
  Type.Composite([
    BaseEntityIntIdSchema,
    Type.Object({
      nome: Type.String({
        description: "Nome oficial do estado.",
      }),
      sigla: Type.String({
        description: "Sigla do estado.",
        "x-validate-estado-sigla": true,
      }),
    }),
  ]),
);
