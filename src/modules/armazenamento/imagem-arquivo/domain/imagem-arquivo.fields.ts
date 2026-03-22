/**
 * Imagem Arquivo — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const ImagemArquivoFields = {
  largura: createFieldMetadata({
    description: "Largura da imagem (em pixels)",
    schema: z.number().int().min(1, "largura deve ser >= 1"),
  }),
  altura: createFieldMetadata({
    description: "Altura da imagem (em pixels)",
    schema: z.number().int().min(1, "altura deve ser >= 1"),
  }),
  formato: createFieldMetadata({
    description: "Formato da imagem",
    schema: z.string().min(1, "formato é obrigatório"),
  }),
  mimeType: createFieldMetadata({
    description: "Tipo MIME da imagem",
    schema: z.string().min(1, "mimeType é obrigatório"),
  }),
  imagem: createFieldMetadata({
    description: "Imagem associada",
  }),
  arquivo: createFieldMetadata({
    description: "Arquivo associado",
  }),
};
