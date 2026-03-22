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

export const CalendarioLetivoPaginationInputSchema = createPaginationInputSchema({
  "filter.ano": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.ofertaFormacao.id": stringFilterSchema,
});

export const CalendarioLetivoGraphqlListInputSchema = createGraphqlListInputSchema({
  filterCampusId: z.array(z.string()).optional(),
  filterOfertaFormacaoId: z.array(z.string()).optional(),
});
