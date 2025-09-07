import { Type } from "@sinclair/typebox";
import { EstadoSchema } from "@/features/estado";
import { BaseEntityIntIdSchema, makeReference, registerSchema, SchemaId } from "@/shared";

export const CidadeSchema = registerSchema(
  SchemaId.Cidade,
  Type.Composite([
    BaseEntityIntIdSchema,
    Type.Object({
      nome: Type.String({
        description: "Nome oficial da cidade.",
      }),
      estado: makeReference(() => EstadoSchema),
    }),
  ]),
);
