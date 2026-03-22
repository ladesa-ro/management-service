import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const imagemDescricaoSchema = z.string().nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const imagemSchema = z
  .object({
    id: uuidSchema,
    descricao: z.string().nullable(),
  })
  .merge(datedSchema);

export const imagemCreateSchema = z.object({
  descricao: imagemDescricaoSchema,
});

export const imagemUpdateSchema = z.object({
  descricao: imagemDescricaoSchema,
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const imagemFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const imagemPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const imagemGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
