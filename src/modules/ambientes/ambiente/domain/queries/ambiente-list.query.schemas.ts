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

export const AmbientePaginationInputSchema = createPaginationInputSchema({
  "filter.bloco.id": stringFilterSchema,
  "filter.bloco.campus.id": stringFilterSchema,
});

export const AmbienteGraphqlListInputSchema = createGraphqlListInputSchema({
  filterBlocoId: z.array(z.string()).optional(),
  filterBlocoCampusId: z.array(z.string()).optional(),
});
