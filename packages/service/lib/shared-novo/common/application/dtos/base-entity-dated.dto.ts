import { Static, Type } from "@sinclair/typebox";
import { BaseDatedEntity } from "@/shared-novo";
import { BaseEntitySchema } from "@/shared-novo/common/application/dtos/base-entity.dto";
import { ScalarDateSchema } from "@/shared-novo/common/application/dtos/value-objects/scalar-date.dto";

export const BaseEntityDatedSchema = Type.Composite([
  BaseEntitySchema,
  Type.Object(
    {
      dateCreated: Type.Composite([ScalarDateSchema], {description: "Data e hora da criação do registro."}),
      dateUpdated: Type.Composite([ScalarDateSchema], {description: "Data e hora da atualização do registro."}),
      dateDeleted: Type.Union([ScalarDateSchema, Type.Null()], {description: "Data e hora da exclusão do registro."}),
    },
    {
      description: "Entidade datada.",
    },
  ),
]);

export type BaseEntityDatedDto = BaseDatedEntity & Static<typeof BaseEntityDatedSchema>;
