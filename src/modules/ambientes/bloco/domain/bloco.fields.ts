/**
 * Bloco — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const BlocoFields = {
  nome: createFieldMetadata({
    description: "Nome do bloco",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  codigo: createFieldMetadata({
    description: "Codigo do bloco",
    schema: createSchema(() => z.string().min(1, "codigo é obrigatório")),
  }),
  campus: createFieldMetadata({
    description: "Campus do bloco",
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa do bloco",
  }),
};
