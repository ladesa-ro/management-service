/**
 * Oferta Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { OfertaFormacaoFields } from "./oferta-formacao.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const OfertaFormacaoModalidadeRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const OfertaFormacaoSchema = z
  .object({
    id: uuidSchema,
    nome: OfertaFormacaoFields.nome.schema,
    slug: OfertaFormacaoFields.slug.schema,
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.schema,
    modalidade: OfertaFormacaoModalidadeRefSchema.nullable(),
  })
  .merge(datedSchema);

export const OfertaFormacaoCreateSchema = z.object({
  nome: OfertaFormacaoFields.nome.schema,
  slug: OfertaFormacaoFields.slug.schema,
  duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.schema,
  modalidade: OfertaFormacaoModalidadeRefSchema,
});

export const OfertaFormacaoUpdateSchema = z.object({
  nome: OfertaFormacaoFields.nome.schema.optional(),
  slug: OfertaFormacaoFields.slug.schema.optional(),
  duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.schema,
  modalidade: OfertaFormacaoModalidadeRefSchema.optional(),
});
