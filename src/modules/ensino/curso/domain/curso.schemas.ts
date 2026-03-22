import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const cursoNomeSchema = z.string().min(1, "nome é obrigatório");

export const cursoNomeAbreviadoSchema = z.string().min(1, "nomeAbreviado é obrigatório");

export const cursoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const cursoOfertaFormacaoRefSchema = z.object({
  id: uuidSchema,
});

export const cursoImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const cursoSchema = z
  .object({
    id: uuidSchema,
    nome: cursoNomeSchema,
    nomeAbreviado: cursoNomeAbreviadoSchema,
    campus: cursoCampusRefSchema,
    ofertaFormacao: cursoOfertaFormacaoRefSchema,
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const cursoCreateSchema = z.object({
  nome: cursoNomeSchema,
  nomeAbreviado: cursoNomeAbreviadoSchema,
  campus: cursoCampusRefSchema,
  ofertaFormacao: cursoOfertaFormacaoRefSchema,
  imagemCapa: cursoImagemCapaRefSchema,
});

export const cursoUpdateSchema = z.object({
  nome: cursoNomeSchema.optional(),
  nomeAbreviado: cursoNomeAbreviadoSchema.optional(),
  campus: cursoCampusRefSchema.optional(),
  ofertaFormacao: cursoOfertaFormacaoRefSchema.optional(),
  imagemCapa: cursoImagemCapaRefSchema,
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const cursoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const cursoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.ofertaFormacao.id": stringFilterSchema,
});

export const cursoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
  filterOfertaFormacaoId: z.array(z.string()).optional(),
});
