/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import { createPaginationInputSchema } from "@/shared/validation/schemas";

export const EstadoPaginationInputSchema = createPaginationInputSchema();
