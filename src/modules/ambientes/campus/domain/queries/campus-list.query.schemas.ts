/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import {
  createGraphqlListInputSchema,
  createPaginationInputSchema,
} from "@/shared/validation/schemas";

export const CampusPaginationInputSchema = createPaginationInputSchema();

export const CampusGraphqlListInputSchema = createGraphqlListInputSchema();
