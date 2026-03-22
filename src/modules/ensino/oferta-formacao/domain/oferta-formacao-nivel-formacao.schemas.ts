import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

export const ofertaFormacaoNivelFormacaoCreateSchema = z.object({
  nivelFormacao: z.object({ id: uuidSchema }),
  ofertaFormacao: z.object({ id: uuidSchema }),
});

export const ofertaFormacaoNivelFormacaoSchema = z
  .object({
    id: uuidSchema,
    nivelFormacao: z.object({ id: uuidSchema }).passthrough(),
    ofertaFormacao: z.object({ id: uuidSchema }).passthrough(),
  })
  .merge(datedSchema);
