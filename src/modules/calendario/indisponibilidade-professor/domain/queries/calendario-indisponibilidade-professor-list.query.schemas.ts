import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const CalendarioIndisponibilidadeProfessorPaginationInputSchema =
  createPaginationInputSchema({
    "filter.perfil.id": stringFilterSchema,
    "filter.tipo": stringFilterSchema,
  });
