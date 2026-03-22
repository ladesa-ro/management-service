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

export const OfertaFormacaoPaginationInputSchema = createPaginationInputSchema({
  "filter.modalidade.id": stringFilterSchema,
});

export const OfertaFormacaoGraphqlListInputSchema = createGraphqlListInputSchema({
  filterModalidadeId: z.array(z.string()).optional(),
});
