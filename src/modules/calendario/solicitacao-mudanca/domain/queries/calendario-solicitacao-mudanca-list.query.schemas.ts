import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioSolicitacaoMudancaPaginationInputSchema = createPaginationInputSchema({
  "filter.status": stringFilterSchema,
  "filter.calendarioAgendamento.id": stringFilterSchema,
  "filter.autor.id": stringFilterSchema,
});
