import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";

export const CalendarioColecaoAcessoParentParamsSchema = z.object({
  colecaoId: uuidSchema,
});

export const CalendarioColecaoAcessoFindOneInputSchema = z.object({
  colecaoId: uuidSchema,
  id: uuidSchema,
});
