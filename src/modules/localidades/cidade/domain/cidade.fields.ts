/**
 * Cidade — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CidadeFields = {
  nome: createFieldMetadata({
    description: "Nome oficial da cidade",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  estado: createFieldMetadata({
    description: "Estado da cidade",
  }),
};
