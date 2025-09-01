import { Static, Type } from "@sinclair/typebox";
import { BaseDatedEntity } from "@/shared";
import { BaseEntitySchema } from "@/shared/base-entity/application/dtos/base-entity.dto";
import { ScalarDateSchema } from "@/shared/base-entity/application/dtos/value-objects/scalars/scalar-date.dto";

export const BaseEntityDatedSchema = Type.Composite([
  BaseEntitySchema,
  Type.Object(
    {
      dateCreated: Type.Composite([ScalarDateSchema], { description: "Data e hora da criação do registro." }),
      dateUpdated: Type.Composite([ScalarDateSchema], { description: "Data e hora da atualização do registro." }),
      dateDeleted: Type.Union([ScalarDateSchema, Type.Null()], { description: "Data e hora da exclusão do registro." }),
    },
    {
      description: "Entidade datada.",
    },
  ),
]);

export type BaseEntityDatedDto = BaseDatedEntity & Static<typeof BaseEntityDatedSchema>;
