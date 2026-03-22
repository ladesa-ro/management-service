import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const modalidadeNomeSchema = z.string().min(1, "nome é obrigatório");

export const modalidadeSlugSchema = z
  .string()
  .min(1, "slug é obrigatório")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "slug deve conter apenas letras minúsculas, números e hífens",
  );

// ============================================================================
// Schemas compostos
// ============================================================================

export const modalidadeSchema = z
  .object({
    id: uuidSchema,
    nome: modalidadeNomeSchema,
    slug: modalidadeSlugSchema,
  })
  .merge(datedSchema);

export const modalidadeCreateSchema = z.object({
  nome: modalidadeNomeSchema,
  slug: modalidadeSlugSchema,
});

export const modalidadeUpdateSchema = z.object({
  nome: modalidadeNomeSchema.optional(),
  slug: modalidadeSlugSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const modalidadeFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const modalidadePaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const modalidadeGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
