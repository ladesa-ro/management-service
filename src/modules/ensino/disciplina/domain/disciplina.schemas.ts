import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const disciplinaNomeSchema = z.string().min(1, "nome é obrigatório");

export const disciplinaNomeAbreviadoSchema = z.string().min(1, "nomeAbreviado é obrigatório");

export const disciplinaCargaHorariaSchema = z
  .number()
  .int()
  .min(1, "cargaHoraria deve ser no mínimo 1");

export const disciplinaImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const disciplinaSchema = z
  .object({
    id: uuidSchema,
    nome: disciplinaNomeSchema,
    nomeAbreviado: disciplinaNomeAbreviadoSchema,
    cargaHoraria: disciplinaCargaHorariaSchema,
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const disciplinaCreateSchema = z.object({
  nome: disciplinaNomeSchema,
  nomeAbreviado: disciplinaNomeAbreviadoSchema,
  cargaHoraria: disciplinaCargaHorariaSchema,
  imagemCapa: disciplinaImagemCapaRefSchema,
});

export const disciplinaUpdateSchema = z.object({
  nome: disciplinaNomeSchema.optional(),
  nomeAbreviado: disciplinaNomeAbreviadoSchema.optional(),
  cargaHoraria: disciplinaCargaHorariaSchema.optional(),
  imagemCapa: disciplinaImagemCapaRefSchema,
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const disciplinaFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const disciplinaPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.diarios.id": stringFilterSchema,
});

export const disciplinaGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterDiariosId: z.array(z.string()).optional(),
});
