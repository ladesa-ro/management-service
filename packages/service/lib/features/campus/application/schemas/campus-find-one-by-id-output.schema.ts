import { Type } from "@sinclair/typebox";
import { CampusSchema } from "@/features/campus/application/schemas/campus.schema";
import { EnderecoFindOneByIdOutputSchema } from "@/features/endereco";
import { FindOneByIdOutputSchemaCustom, makeReference, registerSchema } from "@/shared";

export const CampusFindOneByIdOutputSchema = registerSchema(
  "CampusFindOneByIdOutput",
  FindOneByIdOutputSchemaCustom(
    Type.Composite([
      Type.Pick(CampusSchema, ["id", "nomeFantasia", "razaoSocial", "apelido", "cnpj"]),
      Type.Object({
        endereco: makeReference(() => EnderecoFindOneByIdOutputSchema),
      }),
    ]),
  ),
);
