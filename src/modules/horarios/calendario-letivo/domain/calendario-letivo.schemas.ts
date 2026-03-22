import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const calendarioLetivoNomeSchema = z.string().min(1, "nome é obrigatório");

export const calendarioLetivoAnoSchema = z.number().int().min(1, "ano deve ser >= 1");

export const calendarioLetivoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const calendarioLetivoOfertaFormacaoRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const calendarioLetivoSchema = z
  .object({
    id: uuidSchema,
    nome: calendarioLetivoNomeSchema,
    ano: calendarioLetivoAnoSchema,
    campus: calendarioLetivoCampusRefSchema,
    ofertaFormacao: calendarioLetivoOfertaFormacaoRefSchema.nullable(),
  })
  .merge(datedSchema);

export const calendarioLetivoCreateSchema = z.object({
  nome: calendarioLetivoNomeSchema,
  ano: calendarioLetivoAnoSchema,
  campus: calendarioLetivoCampusRefSchema,
  ofertaFormacao: calendarioLetivoOfertaFormacaoRefSchema.optional(),
});

export const calendarioLetivoUpdateSchema = z.object({
  nome: calendarioLetivoNomeSchema.optional(),
  ano: calendarioLetivoAnoSchema.optional(),
  campus: calendarioLetivoCampusRefSchema.optional(),
  ofertaFormacao: calendarioLetivoOfertaFormacaoRefSchema.nullable().optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const calendarioLetivoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const calendarioLetivoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.ano": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.ofertaFormacao.id": stringFilterSchema,
});

export const calendarioLetivoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
  filterOfertaFormacaoId: z.array(z.string()).optional(),
});
