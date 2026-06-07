/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import {
  coerceFilterArray,
  createPaginationInputSchema,
  stringFilterSchema,
} from "@/shared/validation/schemas";
import { EstagioStatusSchema } from "../estagio.fields";

export const EstagioPaginationInputSchema = createPaginationInputSchema({
  "filter.campus.id": stringFilterSchema,
  "filter.empresa.id": stringFilterSchema,
  "filter.estagiario.id": stringFilterSchema,
  "filter.status": coerceFilterArray(EstagioStatusSchema),
  "filter.CursoReferencia.id": stringFilterSchema,
});
