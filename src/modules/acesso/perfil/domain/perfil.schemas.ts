import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const perfilCargoSchema = z.string().min(1, "cargo é obrigatório");

export const perfilAtivoSchema = z.boolean();

export const perfilCampusRefSchema = z.object({
  id: uuidSchema,
});

export const perfilUsuarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const perfilSchema = z
  .object({
    id: uuidSchema,
    ativo: perfilAtivoSchema,
    cargo: perfilCargoSchema,
    campus: perfilCampusRefSchema,
    usuario: perfilUsuarioRefSchema,
  })
  .merge(datedSchema);

export const perfilCreateSchema = z.object({
  cargo: perfilCargoSchema,
  campus: perfilCampusRefSchema,
  usuario: perfilUsuarioRefSchema,
});

export const perfilUpdateSchema = z.object({
  ativo: perfilAtivoSchema.optional(),
  cargo: perfilCargoSchema.optional(),
  campus: perfilCampusRefSchema.optional(),
  usuario: perfilUsuarioRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const perfilFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const perfilPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.ativo": stringFilterSchema,
  "filter.cargo": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.usuario.id": stringFilterSchema,
});

export const perfilGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterAtivo: z.array(z.string()).optional(),
  filterCargo: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
  filterUsuarioId: z.array(z.string()).optional(),
});

export const perfilSetVinculosInputSchema = z.object({
  cargos: z.array(z.string().min(1)),
  campus: perfilCampusRefSchema,
  usuario: perfilUsuarioRefSchema,
});
