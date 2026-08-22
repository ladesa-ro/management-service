import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioIndisponibilidadeAmbientePaginationInputSchema = createPaginationInputSchema(
  {
    "filter.ambiente.id": stringFilterSchema,
    "filter.tipo": stringFilterSchema,
  },
);
