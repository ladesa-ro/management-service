import { Type } from "@sinclair/typebox";
import { CidadeFindOneByIdInputSchema } from "@/features/cidade/application/schemas";
import { EnderecoSchema } from "@/features/endereco/application/schemas/endereco.schema";
import { registerSchema } from "@/shared";

export const EnderecoCreateInputSchema = registerSchema(
  "EnderecoCreateInput",
  Type.Composite([
    Type.Pick(EnderecoSchema, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]),
    Type.Object({
      cidade: Type.Pick(CidadeFindOneByIdInputSchema, ["id"]),
    }),
  ]),
);
