/**
 * Oferta Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { OfertaFormacaoFields } from "./oferta-formacao.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const OfertaFormacaoModalidadeRefSchema = createSchema(() => z.object({ id: uuidSchema }));

// ============================================================================
// Schemas compostos
// ============================================================================

export const OfertaFormacaoSchema = z
  .object({
    id: uuidSchema,
    nome: OfertaFormacaoFields.nome.domainSchema,
    slug: OfertaFormacaoFields.slug.domainSchema,
    duracaoPeriodoEmMeses: z.number().int().positive().nullable().optional(),
    modalidade: z.object({ id: uuidSchema }).passthrough().nullable(),
  })
  .merge(datedSchema);

export const OfertaFormacaoCreateSchema = createSchema((standard) =>
  z.object({
    nome: OfertaFormacaoFields.nome.create(standard),
    slug: OfertaFormacaoFields.slug.create(standard),
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.create(standard),
    modalidade: OfertaFormacaoModalidadeRefSchema.create(standard),
  }),
);

export const OfertaFormacaoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: OfertaFormacaoFields.nome.create(standard).optional(),
    slug: OfertaFormacaoFields.slug.create(standard).optional(),
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.create(standard),
    modalidade: OfertaFormacaoModalidadeRefSchema.create(standard).optional(),
  }),
);
