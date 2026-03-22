import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const nivelFormacaoSlugSchema = z
  .string()
  .min(1, "slug é obrigatório")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "slug deve conter apenas letras minúsculas, números e hífens",
  );

// ============================================================================
// Schemas compostos
// ============================================================================

export const nivelFormacaoSchema = z
  .object({
    id: uuidSchema,
    slug: nivelFormacaoSlugSchema,
  })
  .merge(datedSchema);

export const nivelFormacaoCreateSchema = z.object({
  slug: nivelFormacaoSlugSchema,
});

export const nivelFormacaoUpdateSchema = z.object({
  slug: nivelFormacaoSlugSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const nivelFormacaoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const nivelFormacaoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const nivelFormacaoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
