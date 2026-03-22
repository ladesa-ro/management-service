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

export const EstagiarioPaginationInputSchema = createPaginationInputSchema({
  "filter.perfil.id": stringFilterSchema,
  "filter.curso.id": stringFilterSchema,
  "filter.turma.id": stringFilterSchema,
});

export const EstagiarioGraphqlListInputSchema = createGraphqlListInputSchema({
  filterPerfilId: z.array(z.string()).optional(),
  filterCursoId: z.array(z.string()).optional(),
  filterTurmaId: z.array(z.string()).optional(),
});
