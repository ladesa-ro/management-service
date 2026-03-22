import { z } from "zod";
import { stringFilterSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const estadoNomeSchema = z.string().min(1, "nome é obrigatório");

export const estadoSiglaSchema = z
  .string()
  .regex(/^[A-Z]{2}$/, "sigla deve ter 2 letras maiúsculas");

// ============================================================================
// Schemas compostos
// ============================================================================

export const estadoSchema = z.object({
  id: z.number().int(),
  nome: estadoNomeSchema,
  sigla: estadoSiglaSchema,
});

export const estadoCreateSchema = estadoSchema;

export const estadoUpdateSchema = z.object({
  nome: estadoNomeSchema.optional(),
  sigla: estadoSiglaSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const estadoFindOneInputSchema = z.object({
  id: z.coerce.number().int(),
});

export const estadoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const estadoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
