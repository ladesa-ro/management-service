/**
 * Oferta Formacao Nivel Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

export const OfertaFormacaoNivelFormacaoCreateSchema = createSchema(() =>
  z.object({
    nivelFormacao: z.object({ id: uuidSchema }),
    ofertaFormacao: z.object({ id: uuidSchema }),
  }),
);

export const OfertaFormacaoNivelFormacaoSchema = z
  .object({
    id: uuidSchema,
    nivelFormacao: z.object({ id: uuidSchema }).passthrough(),
    ofertaFormacao: z.object({ id: uuidSchema }).passthrough(),
  })
  .merge(datedSchema);
