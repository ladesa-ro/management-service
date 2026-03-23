/**
 * Arquivo — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const ArquivoFields = {
  name: createFieldMetadata({
    description: "Nome do arquivo",
    schema: createSchema(() => z.string().min(1, "name é obrigatório")),
  }),
  mimeType: createFieldMetadata({
    description: "Formato do arquivo",
    schema: createSchema(() => z.string().min(1, "mimeType é obrigatório")),
  }),
  sizeBytes: createFieldMetadata({
    description: "Tamanho do arquivo (em bytes)",
    schema: createSchema((standard) =>
      safeInt(standard, (s) => s.min(0, "sizeBytes deve ser >= 0")),
    ),
  }),
  storageType: createFieldMetadata({
    description: "Estrategia de armazenamento do conteudo",
    schema: createSchema(() => z.string().min(1, "storageType é obrigatório")),
  }),
};
