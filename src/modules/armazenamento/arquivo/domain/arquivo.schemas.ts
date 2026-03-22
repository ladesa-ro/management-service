import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const arquivoNameSchema = z.string().min(1, "name é obrigatório");

export const arquivoMimeTypeSchema = z.string().min(1, "mimeType é obrigatório");

export const arquivoSizeBytesSchema = z.number().int().min(0, "sizeBytes deve ser >= 0");

export const arquivoStorageTypeSchema = z.string().min(1, "storageType é obrigatório");

// ============================================================================
// Schemas compostos
// ============================================================================

export const arquivoSchema = z
  .object({
    id: uuidSchema,
    name: arquivoNameSchema,
    mimeType: arquivoMimeTypeSchema,
    sizeBytes: arquivoSizeBytesSchema,
    storageType: arquivoStorageTypeSchema,
  })
  .merge(datedSchema);

export const arquivoCreateSchema = z.object({
  name: arquivoNameSchema,
  mimeType: arquivoMimeTypeSchema,
  sizeBytes: arquivoSizeBytesSchema,
  storageType: arquivoStorageTypeSchema,
});

export const arquivoUpdateSchema = z.object({
  name: arquivoNameSchema.optional(),
  mimeType: arquivoMimeTypeSchema.optional(),
  sizeBytes: arquivoSizeBytesSchema.optional(),
  storageType: arquivoStorageTypeSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const arquivoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const arquivoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const arquivoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
