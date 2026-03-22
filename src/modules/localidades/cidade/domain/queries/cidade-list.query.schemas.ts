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

export const CidadePaginationInputSchema = createPaginationInputSchema({
  "filter.estado.id": stringFilterSchema,
  "filter.estado.nome": stringFilterSchema,
  "filter.estado.sigla": stringFilterSchema,
});

export const CidadeGraphqlListInputSchema = createGraphqlListInputSchema({
  filterEstadoId: z.array(z.string()).optional(),
  filterEstadoNome: z.array(z.string()).optional(),
  filterEstadoSigla: z.array(z.string()).optional(),
});
