/**
 * Modalidade — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ModalidadeFields } from "./modalidade.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const ModalidadeSchema = z
  .object({
    id: uuidSchema,
    nome: ModalidadeFields.nome.domainSchema,
    slug: ModalidadeFields.slug.domainSchema,
  })
  .merge(datedSchema);

export const ModalidadeCreateSchema = createSchema((standard) =>
  z.object({
    nome: ModalidadeFields.nome.create(standard),
    slug: ModalidadeFields.slug.create(standard),
  }),
);

export const ModalidadeUpdateSchema = createSchema((standard) =>
  z.object({
    nome: ModalidadeFields.nome.create(standard).optional(),
    slug: ModalidadeFields.slug.create(standard).optional(),
  }),
);
