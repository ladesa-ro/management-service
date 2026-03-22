import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const diarioAtivoSchema = z.boolean();

export const diarioCalendarioLetivoRefSchema = z.object({
  id: uuidSchema,
});

export const diarioTurmaRefSchema = z.object({
  id: uuidSchema,
});

export const diarioDisciplinaRefSchema = z.object({
  id: uuidSchema,
});

export const diarioAmbientePadraoRefSchema = z.object({
  id: uuidSchema,
});

export const diarioImagemCapaRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const diarioSchema = z
  .object({
    id: uuidSchema,
    ativo: diarioAtivoSchema,
    calendarioLetivo: diarioCalendarioLetivoRefSchema,
    turma: diarioTurmaRefSchema,
    disciplina: diarioDisciplinaRefSchema,
    ambientePadrao: diarioAmbientePadraoRefSchema.nullable(),
    imagemCapa: diarioImagemCapaRefSchema.nullable(),
  })
  .merge(datedSchema);

export const diarioCreateSchema = z.object({
  ativo: diarioAtivoSchema.optional().default(true),
  calendarioLetivo: diarioCalendarioLetivoRefSchema,
  turma: diarioTurmaRefSchema,
  disciplina: diarioDisciplinaRefSchema,
  ambientePadrao: diarioAmbientePadraoRefSchema.nullable().optional(),
});

export const diarioUpdateSchema = z.object({
  ativo: diarioAtivoSchema.optional(),
  calendarioLetivo: diarioCalendarioLetivoRefSchema.optional(),
  turma: diarioTurmaRefSchema.optional(),
  disciplina: diarioDisciplinaRefSchema.optional(),
  ambientePadrao: diarioAmbientePadraoRefSchema.nullable().optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const diarioFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const diarioPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.turma.id": stringFilterSchema,
  "filter.disciplina.id": stringFilterSchema,
  "filter.ambientePadrao.id": stringFilterSchema,
  "filter.calendarioLetivo.id": stringFilterSchema,
});

export const diarioGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterTurmaId: z.array(z.string()).optional(),
  filterDisciplinaId: z.array(z.string()).optional(),
  filterCalendarioLetivoId: z.array(z.string()).optional(),
  filterAmbientePadraoId: z.array(z.string()).optional(),
});
