/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import { z } from "zod";
import {
  createGraphqlListInputSchema,
  createPaginationInputSchema,
  stringFilterSchema,
} from "@/shared/validation/schemas";

export const TurmaPaginationInputSchema = createPaginationInputSchema({
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

export const TurmaGraphqlListInputSchema = createGraphqlListInputSchema({
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
