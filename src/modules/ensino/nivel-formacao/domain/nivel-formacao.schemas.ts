/**
 * Nivel Formacao — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { NivelFormacaoFields } from "./nivel-formacao.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const NivelFormacaoSchema = z
  .object({
    id: uuidSchema,
    nome: NivelFormacaoFields.nome.domainSchema,
    slug: NivelFormacaoFields.slug.domainSchema,
    imagemCapa: ObjectIdUuidFactory.domain.loose().nullable(),
  })
  .extend(datedSchema.shape);

export const NivelFormacaoCreateSchema = createSchema((standard) =>
  z.object({
    nome: NivelFormacaoFields.nome.create(standard),
    slug: NivelFormacaoFields.slug.create(standard),
  }),
);

export const NivelFormacaoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: NivelFormacaoFields.nome.create(standard).optional(),
    slug: NivelFormacaoFields.slug.create(standard).optional(),
  }),
);
