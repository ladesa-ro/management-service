/**
 * Schemas de entrada para listagem paginada e filtros.
 *
 * Define os schemas zod para validacao dos parametros de entrada
 * da query (paginacao, filtros, ordenacao).
 */
import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioAgendamentoPaginationInputSchema = createPaginationInputSchema({
  "filter.tipo": stringFilterSchema,
  "filter.status": stringFilterSchema,
  "filter.turma.id": stringFilterSchema,
  "filter.perfil.id": stringFilterSchema,
  "filter.calendarioLetivo.id": stringFilterSchema,
  "filter.ofertaFormacao.id": stringFilterSchema,
  "filter.modalidade.id": stringFilterSchema,
  "filter.ambiente.id": stringFilterSchema,
  "filter.diario.id": stringFilterSchema,
});
