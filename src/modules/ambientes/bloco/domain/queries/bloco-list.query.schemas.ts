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

export const BlocoPaginationInputSchema = createPaginationInputSchema({
  "filter.campus.id": stringFilterSchema,
});

export const BlocoGraphqlListInputSchema = createGraphqlListInputSchema({
  filterCampusId: z.array(z.string()).optional(),
});
