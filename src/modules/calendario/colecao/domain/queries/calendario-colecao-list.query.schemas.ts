import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioColecaoPaginationInputSchema = createPaginationInputSchema({
  "filter.campus.id": stringFilterSchema,
  "filter.visibilidade": stringFilterSchema,
});
