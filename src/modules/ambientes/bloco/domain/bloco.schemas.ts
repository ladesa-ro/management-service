import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const blocoNomeSchema = z.string().min(1, "nome é obrigatório");

export const blocoCodigoSchema = z.string().min(1, "codigo é obrigatório");

export const blocoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const blocoImagemCapaRefSchema = z
  .object({
    id: uuidSchema,
  })
  .nullable();

// ============================================================================
// Schemas compostos
// ============================================================================

export const blocoSchema = z
  .object({
    id: uuidSchema,
    nome: blocoNomeSchema,
    codigo: blocoCodigoSchema,
    campus: z.object({ id: uuidSchema }).passthrough(),
    imagemCapa: z.object({ id: uuidSchema }).passthrough().nullable(),
  })
  .merge(datedSchema);

export const blocoCreateSchema = z.object({
  nome: blocoNomeSchema,
  codigo: blocoCodigoSchema,
  campus: blocoCampusRefSchema,
});

export const blocoUpdateSchema = z.object({
  nome: blocoNomeSchema.optional(),
  codigo: blocoCodigoSchema.optional(),
  campus: blocoCampusRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const blocoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const blocoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
});

export const blocoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
});

// ============================================================================
// Schemas de input para create/update (presentation layer)
// ============================================================================

export const blocoInputCreateSchema = z.object({
  nome: blocoNomeSchema,
  codigo: blocoCodigoSchema,
  campus: blocoCampusRefSchema,
});

export const blocoInputUpdateSchema = blocoInputCreateSchema.partial();
