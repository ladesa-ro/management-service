/**
 * Oferta Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { OfertaFormacaoFields } from "./oferta-formacao.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const OfertaFormacaoModalidadeRefSchema = ObjectIdUuidFactory;

export const OfertaFormacaoCampusRefSchema = ObjectIdUuidFactory;

export const OfertaFormacaoNivelFormacaoRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas de periodo/etapa (value objects do aggregate)
// ============================================================================

const ofertaFormacaoPeriodoEtapaSchema = z.object({
  nome: z.string().min(1),
  cor: z.string().min(1),
});

const ofertaFormacaoPeriodoSchema = z.object({
  numeroPeriodo: z.number().int().positive(),
  etapas: z.array(ofertaFormacaoPeriodoEtapaSchema.loose()).min(1),
});

// ============================================================================
// Helpers
// ============================================================================

const niveisFormacoesSemDuplicatas = <T extends Array<{ id: string }>>(arr: T) => {
  const ids = arr.map((nf) => nf.id);
  return new Set(ids).size === ids.length;
};

// ============================================================================
// Schemas compostos
// ============================================================================

export const OfertaFormacaoSchema = z
  .object({
    id: uuidSchema,
    nome: OfertaFormacaoFields.nome.domainSchema,
    slug: OfertaFormacaoFields.slug.domainSchema,
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.domainSchema,
    modalidade: ObjectIdUuidFactory.domain.loose(),
    campus: ObjectIdUuidFactory.domain.loose(),
    niveisFormacoes: z
      .array(ObjectIdUuidFactory.domain.loose())
      .min(1)
      .refine(niveisFormacoesSemDuplicatas, {
        message: "niveisFormacoes não pode conter IDs duplicados",
      }),
    periodos: z.array(ofertaFormacaoPeriodoSchema.loose()),
    imagemCapa: ObjectIdUuidFactory.domain.loose().nullable(),
  })
  .extend(datedSchema.shape);

export const OfertaFormacaoCreateSchema = createSchema((standard) =>
  z.object({
    nome: OfertaFormacaoFields.nome.create(standard),
    slug: OfertaFormacaoFields.slug.create(standard),
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.create(standard),
    modalidade: OfertaFormacaoModalidadeRefSchema.create(standard),
    campus: OfertaFormacaoCampusRefSchema.create(standard),
    niveisFormacoes: z
      .array(OfertaFormacaoNivelFormacaoRefSchema.create(standard))
      .min(1)
      .refine(niveisFormacoesSemDuplicatas, {
        message: "niveisFormacoes não pode conter IDs duplicados",
      }),
    periodos: z.array(ofertaFormacaoPeriodoSchema),
  }),
);

export const OfertaFormacaoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: OfertaFormacaoFields.nome.create(standard).optional(),
    slug: OfertaFormacaoFields.slug.create(standard).optional(),
    duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses.create(standard).optional(),
    modalidade: OfertaFormacaoModalidadeRefSchema.create(standard).optional(),
    campus: OfertaFormacaoCampusRefSchema.create(standard).optional(),
    niveisFormacoes: z
      .array(OfertaFormacaoNivelFormacaoRefSchema.create(standard))
      .min(1)
      .refine(niveisFormacoesSemDuplicatas, {
        message: "niveisFormacoes não pode conter IDs duplicados",
      })
      .optional(),
    periodos: z.array(ofertaFormacaoPeriodoSchema).optional(),
  }),
);
