import { Static, Type } from "@sinclair/typebox";
import { Estado } from "@/features/estado/domain/entities/estado.entity";
import { BaseEntityIntIdSchema, registerSchema, SchemaId } from "@/shared-novo";

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

export type EstadoDto = Estado & Static<typeof EstadoSchema>;
