import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const ambienteNomeSchema = z.string().min(1, "nome é obrigatório");

export const ambienteDescricaoSchema = z.string().nullable().optional();

export const ambienteCodigoSchema = z.string().min(1, "codigo é obrigatório");

export const ambienteCapacidadeSchema = z.number().int().min(0).nullable().optional();

export const ambienteTipoSchema = z.string().nullable().optional();

export const ambienteBlocoRefSchema = z.object({
  id: uuidSchema,
});

export const ambienteImagemCapaRefSchema = z
  .object({
    id: uuidSchema,
  })
  .nullable();

// ============================================================================
// Schemas compostos
// ============================================================================

export const ambienteSchema = z
  .object({
    id: uuidSchema,
    nome: ambienteNomeSchema,
    descricao: z.string().nullable(),
    codigo: ambienteCodigoSchema,
    capacidade: z.number().int().nullable(),
    tipo: z.string().nullable(),
    bloco: z.object({ id: uuidSchema }).passthrough(),
    imagemCapa: z.object({ id: uuidSchema }).passthrough().nullable(),
  })
  .merge(datedSchema);

export const ambienteCreateSchema = z.object({
  nome: ambienteNomeSchema,
  descricao: ambienteDescricaoSchema,
  codigo: ambienteCodigoSchema,
  capacidade: ambienteCapacidadeSchema,
  tipo: ambienteTipoSchema,
  bloco: ambienteBlocoRefSchema,
});

export const ambienteUpdateSchema = z.object({
  nome: ambienteNomeSchema.optional(),
  descricao: ambienteDescricaoSchema,
  codigo: ambienteCodigoSchema.optional(),
  capacidade: ambienteCapacidadeSchema,
  tipo: ambienteTipoSchema,
  bloco: ambienteBlocoRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const ambienteFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const ambientePaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.bloco.id": stringFilterSchema,
  "filter.bloco.campus.id": stringFilterSchema,
});

export const ambienteGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterBlocoId: z.array(z.string()).optional(),
  filterBlocoCampusId: z.array(z.string()).optional(),
});

// ============================================================================
// Schemas de input para create/update (presentation layer)
// ============================================================================

export const ambienteInputCreateSchema = z.object({
  nome: ambienteNomeSchema,
  descricao: ambienteDescricaoSchema,
  codigo: ambienteCodigoSchema,
  capacidade: ambienteCapacidadeSchema,
  tipo: ambienteTipoSchema,
  bloco: ambienteBlocoRefSchema,
});

export const ambienteInputUpdateSchema = z.object({
  nome: ambienteNomeSchema.optional(),
  descricao: ambienteDescricaoSchema,
  codigo: ambienteCodigoSchema.optional(),
  capacidade: ambienteCapacidadeSchema,
  tipo: ambienteTipoSchema,
  bloco: ambienteBlocoRefSchema.optional(),
});
