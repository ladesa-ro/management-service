import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const imagemArquivoLarguraSchema = z.number().int().min(1, "largura deve ser >= 1");

export const imagemArquivoAlturaSchema = z.number().int().min(1, "altura deve ser >= 1");

export const imagemArquivoFormatoSchema = z.string().min(1, "formato é obrigatório");

export const imagemArquivoMimeTypeSchema = z.string().min(1, "mimeType é obrigatório");

export const imagemArquivoImagemRefSchema = z.object({
  id: uuidSchema,
});

export const imagemArquivoArquivoRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const imagemArquivoSchema = z
  .object({
    id: uuidSchema,
    largura: imagemArquivoLarguraSchema,
    altura: imagemArquivoAlturaSchema,
    formato: imagemArquivoFormatoSchema,
    mimeType: imagemArquivoMimeTypeSchema,
    imagem: imagemArquivoImagemRefSchema,
    arquivo: imagemArquivoArquivoRefSchema,
  })
  .merge(datedSchema);

export const imagemArquivoCreateSchema = z.object({
  largura: imagemArquivoLarguraSchema,
  altura: imagemArquivoAlturaSchema,
  formato: imagemArquivoFormatoSchema,
  mimeType: imagemArquivoMimeTypeSchema,
  imagem: imagemArquivoImagemRefSchema,
  arquivo: imagemArquivoArquivoRefSchema,
});

export const imagemArquivoUpdateSchema = z.object({
  largura: imagemArquivoLarguraSchema.optional(),
  altura: imagemArquivoAlturaSchema.optional(),
  formato: imagemArquivoFormatoSchema.optional(),
  mimeType: imagemArquivoMimeTypeSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const imagemArquivoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const imagemArquivoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const imagemArquivoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
