import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioColecaoAcessoPaginationInputSchema = createPaginationInputSchema({
  "filter.colecao.id": stringFilterSchema,
  "filter.escopo": stringFilterSchema,
});
