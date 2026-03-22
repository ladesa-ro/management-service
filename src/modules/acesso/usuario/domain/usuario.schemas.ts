import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const usuarioNomeSchema = z
  .string()
  .min(1, "nome deve ter pelo menos 1 caractere")
  .nullable()
  .optional();

export const usuarioMatriculaSchema = z
  .string()
  .min(1, "matrícula deve ter pelo menos 1 caractere")
  .nullable()
  .optional();

export const usuarioEmailSchema = z.string().email("email inválido").nullable().optional();

export const usuarioImagemRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const usuarioSchema = z
  .object({
    id: uuidSchema,
    nome: z.string().nullable(),
    matricula: z.string().nullable(),
    email: z.string().nullable(),
    isSuperUser: z.boolean(),
    imagemCapa: z.unknown().nullable(),
    imagemPerfil: z.unknown().nullable(),
  })
  .merge(datedSchema);

export const usuarioCreateSchema = z.object({
  nome: usuarioNomeSchema,
  matricula: usuarioMatriculaSchema,
  email: usuarioEmailSchema,
});

export const usuarioUpdateSchema = z.object({
  nome: usuarioNomeSchema,
  matricula: usuarioMatriculaSchema,
  email: usuarioEmailSchema,
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const usuarioFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const usuarioPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.vinculos.cargo": z.string().optional(),
});

export const usuarioGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});
