import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const estagiarioIdPerfilFkSchema = uuidSchema;
export const estagiarioIdCursoFkSchema = uuidSchema;
export const estagiarioIdTurmaFkSchema = uuidSchema;

export const estagiarioTelefoneSchema = z
  .string()
  .min(1, "telefone é obrigatório")
  .max(15, "telefone deve ter no máximo 15 caracteres");

export const estagiarioEmailInstitucionalSchema = z
  .string()
  .email("email institucional inválido")
  .nullable()
  .optional();

export const estagiarioDataNascimentoSchema = z
  .string()
  .min(1, "data de nascimento é obrigatória")
  .refine((val) => !isNaN(new Date(val).getTime()), "data de nascimento inválida");

// ============================================================================
// Schemas compostos
// ============================================================================

export const estagiarioSchema = z
  .object({
    id: uuidSchema,
    idPerfilFk: uuidSchema,
    idCursoFk: uuidSchema,
    idTurmaFk: uuidSchema,
    telefone: z.string().min(1).max(15),
    emailInstitucional: z.string().nullable(),
    dataNascimento: z.string(),
  })
  .merge(datedSchema);

export const estagiarioCreateSchema = z.object({
  idPerfilFk: estagiarioIdPerfilFkSchema,
  idCursoFk: estagiarioIdCursoFkSchema,
  idTurmaFk: estagiarioIdTurmaFkSchema,
  telefone: estagiarioTelefoneSchema,
  emailInstitucional: estagiarioEmailInstitucionalSchema,
  dataNascimento: estagiarioDataNascimentoSchema,
});

export const estagiarioUpdateSchema = z.object({
  idPerfilFk: estagiarioIdPerfilFkSchema.optional(),
  idCursoFk: estagiarioIdCursoFkSchema.optional(),
  idTurmaFk: estagiarioIdTurmaFkSchema.optional(),
  telefone: estagiarioTelefoneSchema.optional(),
  emailInstitucional: estagiarioEmailInstitucionalSchema,
  dataNascimento: estagiarioDataNascimentoSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const estagiarioFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const estagiarioPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.idPerfilFk": stringFilterSchema,
  "filter.idCursoFk": stringFilterSchema,
  "filter.idTurmaFk": stringFilterSchema,
});

export const estagiarioGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterIdPerfilFk: z.array(z.string()).optional(),
  filterIdCursoFk: z.array(z.string()).optional(),
  filterIdTurmaFk: z.array(z.string()).optional(),
});
