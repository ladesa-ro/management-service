import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const turmaPeriodoSchema = z.string().min(1, "periodo é obrigatório");

export const turmaNomeSchema = z.string().nullable().optional();

export const turmaCursoRefSchema = z.object({
  id: uuidSchema,
});

export const turmaAmbientePadraoAulaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

export const turmaImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const turmaSchema = z
  .object({
    id: uuidSchema,
    periodo: turmaPeriodoSchema,
    curso: turmaCursoRefSchema,
    ambientePadraoAula: z.object({ id: uuidSchema }).nullable(),
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const turmaCreateSchema = z.object({
  periodo: turmaPeriodoSchema,
  nome: turmaNomeSchema,
  curso: turmaCursoRefSchema,
  ambientePadraoAula: turmaAmbientePadraoAulaRefSchema,
  imagemCapa: turmaImagemCapaRefSchema,
});

export const turmaUpdateSchema = z.object({
  periodo: turmaPeriodoSchema.optional(),
  nome: turmaNomeSchema,
  curso: turmaCursoRefSchema.optional(),
  ambientePadraoAula: turmaAmbientePadraoAulaRefSchema,
  imagemCapa: turmaImagemCapaRefSchema,
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const turmaFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const turmaPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.periodo": stringFilterSchema,
  "filter.ambientePadraoAula.nome": stringFilterSchema,
  "filter.ambientePadraoAula.codigo": stringFilterSchema,
  "filter.ambientePadraoAula.capacidade": stringFilterSchema,
  "filter.ambientePadraoAula.tipo": stringFilterSchema,
  "filter.curso.id": stringFilterSchema,
  "filter.curso.nome": stringFilterSchema,
  "filter.curso.nomeAbreviado": stringFilterSchema,
  "filter.curso.campus.id": stringFilterSchema,
  "filter.curso.ofertaFormacao.id": stringFilterSchema,
  "filter.curso.ofertaFormacao.nome": stringFilterSchema,
  "filter.curso.ofertaFormacao.slug": stringFilterSchema,
});

export const turmaGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterAmbientePadraoAulaNome: z.array(z.string()).optional(),
  filterAmbientePadraoAulaCodigo: z.array(z.string()).optional(),
  filterAmbientePadraoAulaCapacidade: z.array(z.string()).optional(),
  filterAmbientePadraoAulaTipo: z.array(z.string()).optional(),
  filterCursoId: z.array(z.string()).optional(),
  filterCursoNome: z.array(z.string()).optional(),
  filterCursoNomeAbreviado: z.array(z.string()).optional(),
  filterCursoCampusId: z.array(z.string()).optional(),
  filterCursoOfertaFormacaoId: z.array(z.string()).optional(),
  filterCursoOfertaFormacaoNome: z.array(z.string()).optional(),
  filterCursoOfertaFormacaoSlug: z.array(z.string()).optional(),
});
