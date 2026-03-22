/**
 * Campus — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const CampusFields = {
  nomeFantasia: createFieldMetadata({
    description: "Nome fantasia do campus",
    schema: z.string().min(1, "nomeFantasia é obrigatório"),
  }),
  razaoSocial: createFieldMetadata({
    description: "Razao social do campus",
    schema: z.string().min(1, "razaoSocial é obrigatório"),
  }),
  apelido: createFieldMetadata({
    description: "Apelido do campus",
    schema: z.string().min(1, "apelido é obrigatório"),
  }),
  cnpj: createFieldMetadata({
    description: "CNPJ do campus",
    schema: z
      .string()
      .min(1, "cnpj é obrigatório")
      .transform((val) => val.replace(/\D/g, ""))
      .pipe(z.string().regex(/^\d{14}$/, "cnpj deve conter exatamente 14 dígitos")),
  }),
  endereco: createFieldMetadata({
    description: "Endereco do campus",
  }),
};
