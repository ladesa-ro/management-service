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

export const PerfilPaginationInputSchema = createPaginationInputSchema({
  "filter.ativo": stringFilterSchema,
  "filter.cargo": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.usuario.id": stringFilterSchema,
});

export const PerfilGraphqlListInputSchema = createGraphqlListInputSchema({
  filterAtivo: z.array(z.string()).optional(),
  filterCargo: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
  filterUsuarioId: z.array(z.string()).optional(),
});
