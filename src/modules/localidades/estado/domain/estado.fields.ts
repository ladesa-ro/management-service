/**
 * Estado — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const EstadoFields = {
  nome: createFieldMetadata({
    description: "Nome oficial do estado",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  sigla: createFieldMetadata({
    description: "Sigla do estado",
    schema: createSchema(() =>
      z.string().regex(/^[A-Z]{2}$/, "sigla deve ter 2 letras maiúsculas"),
    ),
  }),
};
