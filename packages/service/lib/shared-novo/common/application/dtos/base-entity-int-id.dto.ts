import { Static, Type } from "@sinclair/typebox";
import { BaseEntitySchema, BaseIntIdEntity } from "@/shared-novo";

export const BaseEntityIntIdSchema = Type.Composite([
  BaseEntitySchema,
  Type.Object(
    {
      id: Type.Integer({
        minimum: 1,
        description: "Identificador do registro (número inteiro).",
      }),
    },
    {
      description: "Estrutura identificada por ID no formato de número inteiro.",
    },
  ),
]);

export type BaseEntityIntIdDto = BaseIntIdEntity & Static<typeof BaseEntityIntIdSchema>;
