import { Type } from "@sinclair/typebox";
import { EnderecoSchema } from "@/features/endereco/application/schemas/endereco.schema";
import { FindOneByIdInputSchemaCustom, FindOneByIdOutputSchemaCustom, registerSchema } from "@/shared";

export const EnderecoFindOneByIdInputSchema = registerSchema("EnderecoFindOneByIdInput", FindOneByIdInputSchemaCustom(EnderecoSchema));

export const EnderecoFindOneByIdOutputSchema = registerSchema(
  "EnderecoFindOneByIdOutput",
  FindOneByIdOutputSchemaCustom(Type.Pick(EnderecoSchema, ["id", "cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia", "cidade", "dateCreated", "dateUpdated", "dateDeleted"])),
);
