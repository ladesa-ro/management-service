/**
 * Schemas de entrada para busca por ID.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import { findOneUuidInputSchema } from "@/shared/validation/schemas";

export const CampusFindOneInputSchema = findOneUuidInputSchema;
