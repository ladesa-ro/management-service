import { Static, Type } from "@sinclair/typebox";
import { BaseUuidEntity } from "@/shared-novo";
import { BaseEntitySchema } from "@/shared-novo/common/application/dtos/base-entity.dto";

export const BaseEntityUuidSchema = Type.Composite([
  BaseEntitySchema,
  Type.Object(
    {
      id: Type.String({
        format: "uuid",
        description: "Identificador do registro (uuid).",
      }),
    },
    {
      description: "Estrutura identificada por id no formato uuid.",
    },
  ),
]);

export type BaseEntityUuidDto = BaseUuidEntity & Static<typeof BaseEntityUuidSchema>;
