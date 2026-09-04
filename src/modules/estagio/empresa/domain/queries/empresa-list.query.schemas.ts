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
  "filter.razaoSocial": stringFilterSchema,
  "filter.email": stringFilterSchema,
  "filter.telefone": stringFilterSchema,
  "filter.endereco.id": stringFilterSchema,
  "filter.endereco.cidade.id": stringFilterSchema,
  "filter.cidade.id": stringFilterSchema,
  "filter.endereco.cidade.nome": stringFilterSchema,
  "filter.cidade.nome": stringFilterSchema,
  "filter.endereco.cidade.estado.id": stringFilterSchema,
  "filter.estado.id": stringFilterSchema,
  "filter.endereco.cidade.estado.sigla": stringFilterSchema,
  "filter.estado.sigla": stringFilterSchema,
});

export const EmpresaGraphqlListInputSchema = createGraphqlListInputSchema({
  filterCnpj: z.array(z.string()).optional(),
  filterNomeFantasia: z.array(z.string()).optional(),
  filterRazaoSocial: z.array(z.string()).optional(),
  filterEmail: z.array(z.string()).optional(),
  filterTelefone: z.array(z.string()).optional(),
  filterEnderecoId: z.array(z.string()).optional(),
  filterCidadeId: z.array(z.string()).optional(),
  filterCidadeNome: z.array(z.string()).optional(),
  filterEstadoId: z.array(z.string()).optional(),
  filterEstadoSigla: z.array(z.string()).optional(),
});
