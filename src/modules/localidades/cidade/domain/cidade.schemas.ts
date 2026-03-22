import { z } from "zod";
import { stringFilterSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const cidadeNomeSchema = z.string().min(1, "nome é obrigatório");

// ============================================================================
// Schemas compostos
// ============================================================================

export const cidadeSchema = z.object({
  id: z.number().int(),
  nome: cidadeNomeSchema,
});

export const cidadeCreateSchema = cidadeSchema;

export const cidadeUpdateSchema = z.object({
  nome: cidadeNomeSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const cidadeFindOneInputSchema = z.object({
  id: z.coerce.number().int(),
});

export const cidadePaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.estado.id": stringFilterSchema,
  "filter.estado.nome": stringFilterSchema,
  "filter.estado.sigla": stringFilterSchema,
});

export const cidadeGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterEstadoId: z.array(z.string()).optional(),
  filterEstadoNome: z.array(z.string()).optional(),
  filterEstadoSigla: z.array(z.string()).optional(),
});
