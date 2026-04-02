/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioLetivoDiaListInputSchema = createPaginationInputSchema({
  "filter.calendario.nome": stringFilterSchema,
  "filter.calendario.ano": stringFilterSchema,
});
