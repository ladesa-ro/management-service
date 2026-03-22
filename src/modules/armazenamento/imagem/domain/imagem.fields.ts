/**
 * Imagem — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const ImagemFields = {
  descricao: createFieldMetadata({
    description: "Descricao da imagem",
    schema: z.string().nullable().optional(),
  }),
  versoes: createFieldMetadata({
    description: "Versoes da imagem (arquivos associados)",
  }),
};
