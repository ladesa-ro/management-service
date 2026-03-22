/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import {
  coerceArray,
  createPaginationInputSchema,
  stringFilterSchema,
} from "@/shared/validation/schemas";
import { EstagioStatusSchema } from "../estagio.fields";

export const EstagioPaginationInputSchema = createPaginationInputSchema({
  "filter.empresa.id": stringFilterSchema,
  "filter.estagiario.id": stringFilterSchema,
  "filter.status": coerceArray(EstagioStatusSchema),
});
