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

export const DisciplinaPaginationInputSchema = createPaginationInputSchema({
  "filter.diarios.id": stringFilterSchema,
});

export const DisciplinaGraphqlListInputSchema = createGraphqlListInputSchema({
  filterDiariosId: z.array(z.string()).optional(),
});
