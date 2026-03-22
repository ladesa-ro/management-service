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

export const EmpresaPaginationInputSchema = createPaginationInputSchema({
  "filter.cnpj": stringFilterSchema,
  "filter.nomeFantasia": stringFilterSchema,
  "filter.endereco.id": stringFilterSchema,
});

export const EmpresaGraphqlListInputSchema = createGraphqlListInputSchema({
  filterCnpj: z.array(z.string()).optional(),
  filterNomeFantasia: z.array(z.string()).optional(),
  filterEnderecoId: z.array(z.string()).optional(),
});
