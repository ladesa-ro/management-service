/**
 * Nivel Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { NivelFormacaoFields } from "./nivel-formacao.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const NivelFormacaoSchema = z
  .object({
    id: uuidSchema,
    slug: NivelFormacaoFields.slug.schema,
  })
  .merge(datedSchema);

export const NivelFormacaoCreateSchema = z.object({
  slug: NivelFormacaoFields.slug.schema,
});

export const NivelFormacaoUpdateSchema = z.object({
  slug: NivelFormacaoFields.slug.schema.optional(),
});
