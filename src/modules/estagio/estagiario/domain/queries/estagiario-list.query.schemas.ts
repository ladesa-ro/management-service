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

export const EstagiarioPaginationInputSchema = createPaginationInputSchema({
  "filter.perfil.id": stringFilterSchema,
  "filter.perfil.usuario.matricula": stringFilterSchema,
  "filter.perfil.usuario.nome": stringFilterSchema,
  "filter.perfil.usuario.email": stringFilterSchema,
  "filter.perfil.campus.id": stringFilterSchema,
  "filter.matricula": stringFilterSchema,
  "filter.nome": stringFilterSchema,
  "filter.email": stringFilterSchema,
  "filter.campus.id": stringFilterSchema,
  "filter.curso.id": stringFilterSchema,
  "filter.curso.nome": stringFilterSchema,
  "filter.periodo": stringFilterSchema,
  "filter.emailInstitucional": stringFilterSchema,
  "filter.telefone": stringFilterSchema,
});

export const EstagiarioGraphqlListInputSchema = createGraphqlListInputSchema({
  filterPerfilId: z.array(z.string()).optional(),
  filterCursoId: z.array(z.string()).optional(),
  filterPeriodo: z.array(z.string()).optional(),
  filterMatricula: z.array(z.string()).optional(),
  filterNome: z.array(z.string()).optional(),
  filterEmail: z.array(z.string()).optional(),
  filterCampusId: z.array(z.string()).optional(),
  filterCursoNome: z.array(z.string()).optional(),
  filterEmailInstitucional: z.array(z.string()).optional(),
  filterTelefone: z.array(z.string()).optional(),
});
