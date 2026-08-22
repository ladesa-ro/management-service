import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const TurmaMatriculaPaginationInputSchema = createPaginationInputSchema({
  "filter.turma.id": stringFilterSchema,
  "filter.perfil.id": stringFilterSchema,
});
