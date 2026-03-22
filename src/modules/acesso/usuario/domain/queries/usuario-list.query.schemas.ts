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
} from "@/shared/validation/schemas";

export const UsuarioPaginationInputSchema = createPaginationInputSchema({
  "filter.vinculos.cargo": z.string().optional(),
});

export const UsuarioGraphqlListInputSchema = createGraphqlListInputSchema();
