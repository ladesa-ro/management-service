/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import {
  coerceFilterArray,
  createPaginationInputSchema,
  stringFilterSchema,
} from "@/shared/validation/schemas";
import { EstagioStatusSchema } from "../estagio.fields";

export const EstagioPaginationInputSchema = createPaginationInputSchema({
  "filter.campus.id": stringFilterSchema,
  "filter.empresa.id": stringFilterSchema,
  "filter.empresa.cnpj": stringFilterSchema,
  "filter.empresa.razaoSocial": stringFilterSchema,
  "filter.empresa.nomeFantasia": stringFilterSchema,
  "filter.estagiario.id": stringFilterSchema,
  "filter.estagiario.matricula": stringFilterSchema,
  "filter.estagiario.perfil.usuario.matricula": stringFilterSchema,
  "filter.estagiario.nome": stringFilterSchema,
  "filter.estagiario.perfil.usuario.nome": stringFilterSchema,
  "filter.estagiario.curso.id": stringFilterSchema,
  "filter.status": coerceFilterArray(EstagioStatusSchema),
  "filter.nomeSupervisor": stringFilterSchema,
  "filter.emailSupervisor": stringFilterSchema,
  "filter.CursoReferencia.id": stringFilterSchema,
  "filter.usuarioOrientador.id": stringFilterSchema,
  "filter.usuarioOrientador.matricula": stringFilterSchema,
  "filter.usuarioOrientador.nome": stringFilterSchema,
  "filter.dataInicio": stringFilterSchema,
  "filter.dataFim": stringFilterSchema,
  "filter.aditivo": stringFilterSchema,
});
