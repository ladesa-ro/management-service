/**
 * Empresa — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const EmpresaFields = {
  razaoSocial: createFieldMetadata({
    description: "Razão social da empresa",
    schema: createSchema(() => z.string().min(1, "razão social é obrigatória")),
  }),
  nomeFantasia: createFieldMetadata({
    description: "Nome fantasia da empresa",
    schema: createSchema(() => z.string().min(1, "nome fantasia é obrigatório")),
  }),
  cnpj: createFieldMetadata({
    description: "CNPJ sem pontuação",
    schema: createSchema(() =>
      z
        .string()
        .min(1, "CNPJ é obrigatório")
        .transform((val) => val.replace(/\D/g, ""))
        .pipe(z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos")),
    ),
  }),
  telefone: createFieldMetadata({
    description: "Telefone da empresa",
    schema: createSchema(() =>
      z
        .string()
        .min(1, "telefone é obrigatório")
        .max(15, "telefone deve ter no máximo 15 caracteres"),
    ),
  }),
  email: createFieldMetadata({
    description: "E-mail da empresa",
    schema: createSchema(() => z.string().email("email inválido")),
  }),
  endereco: createFieldMetadata({
    description: "Endereço vinculado à empresa",
  }),
  ativo: createFieldMetadata({
    description: "Se a empresa está ativa",
  }),
};
