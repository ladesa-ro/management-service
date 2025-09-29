import { Type } from "@sinclair/typebox";
import { EnderecoSchema } from "@/features/endereco";
import { BaseEntityDatedSchema, BaseEntityUuidSchema, makeReference, registerSchema } from "@/shared";

export const CampusSchema = registerSchema(
  "Campus",
  Type.Composite([
    BaseEntityUuidSchema,
    BaseEntityDatedSchema,
    Type.Object({
      nomeFantasia: Type.String(),
      razaoSocial: Type.String(),
      apelido: Type.String(),
      cnpj: Type.String(),

      endereco: makeReference(() => EnderecoSchema),
    }),
  ]),
);
