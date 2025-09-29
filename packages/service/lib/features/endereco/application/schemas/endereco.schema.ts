import { Type } from "@sinclair/typebox";
import { CidadeSchema } from "@/features/cidade/application/schemas";
import { BaseEntityDatedSchema, BaseEntityUuidSchema, makeReference, registerSchema } from "@/shared";

export const EnderecoSchema = registerSchema(
  "Endereco",
  Type.Composite([
    BaseEntityUuidSchema,
    BaseEntityDatedSchema,
    Type.Object({
      cep: Type.String(),
      logradouro: Type.String(),

      numero: Type.Integer({min: 0, max: 10000}),
      bairro: Type.String(),

      complemento: Type.Union([Type.String(), Type.Null()]),
      pontoReferencia: Type.Union([Type.String(), Type.Null()]),

      cidade: makeReference(() => CidadeSchema),
    }),
  ]),
);
