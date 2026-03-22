/**
 * Imagem Arquivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ImagemArquivoFields } from "./imagem-arquivo.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const ImagemArquivoImagemRefSchema = z.object({
  id: uuidSchema,
});

export const ImagemArquivoArquivoRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const ImagemArquivoSchema = z
  .object({
    id: uuidSchema,
    largura: ImagemArquivoFields.largura.schema,
    altura: ImagemArquivoFields.altura.schema,
    formato: ImagemArquivoFields.formato.schema,
    mimeType: ImagemArquivoFields.mimeType.schema,
    imagem: ImagemArquivoImagemRefSchema,
    arquivo: ImagemArquivoArquivoRefSchema,
  })
  .merge(datedSchema);

export const ImagemArquivoCreateSchema = z.object({
  largura: ImagemArquivoFields.largura.schema,
  altura: ImagemArquivoFields.altura.schema,
  formato: ImagemArquivoFields.formato.schema,
  mimeType: ImagemArquivoFields.mimeType.schema,
  imagem: ImagemArquivoImagemRefSchema,
  arquivo: ImagemArquivoArquivoRefSchema,
});

export const ImagemArquivoUpdateSchema = z.object({
  largura: ImagemArquivoFields.largura.schema.optional(),
  altura: ImagemArquivoFields.altura.schema.optional(),
  formato: ImagemArquivoFields.formato.schema.optional(),
  mimeType: ImagemArquivoFields.mimeType.schema.optional(),
});
