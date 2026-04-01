import { createPaginationInputSchema, stringFilterSchema } from "@/shared/validation/schemas";

export const PerfilPaginationInputSchema = createPaginationInputSchema({
  "filter.campus.id": stringFilterSchema,
  "filter.usuario.id": stringFilterSchema,
  "filter.cargo.nome": stringFilterSchema,
});
