import { Type } from "@sinclair/typebox";
import { CampusSchema } from "@/features/campus/application/schemas/campus.schema";
import { EnderecoCreateInputSchema } from "@/features/endereco";
import { makeReference, registerSchema } from "@/shared";

export const CampusCreateInputSchema = registerSchema(
  "CampusCreateInput",
  Type.Composite([
    Type.Pick(CampusSchema, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]),
    Type.Object({
      endereco: makeReference(() => EnderecoCreateInputSchema),
    }),
  ]),
);
