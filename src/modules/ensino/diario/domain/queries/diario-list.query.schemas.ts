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

export const DiarioPaginationInputSchema = createPaginationInputSchema({
  "filter.turma.id": stringFilterSchema,
  "filter.disciplina.id": stringFilterSchema,
  "filter.ambientePadrao.id": stringFilterSchema,
  "filter.calendarioLetivo.id": stringFilterSchema,
});

export const DiarioGraphqlListInputSchema = createGraphqlListInputSchema({
  filterTurmaId: z.array(z.string()).optional(),
  filterDisciplinaId: z.array(z.string()).optional(),
  filterCalendarioLetivoId: z.array(z.string()).optional(),
  filterAmbientePadraoId: z.array(z.string()).optional(),
});
