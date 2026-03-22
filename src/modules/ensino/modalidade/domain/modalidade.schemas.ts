/**
 * Modalidade — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ModalidadeFields } from "./modalidade.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const ModalidadeSchema = z
  .object({
    id: uuidSchema,
    nome: ModalidadeFields.nome.schema,
    slug: ModalidadeFields.slug.schema,
  })
  .merge(datedSchema);

export const ModalidadeCreateSchema = z.object({
  nome: ModalidadeFields.nome.schema,
  slug: ModalidadeFields.slug.schema,
});

export const ModalidadeUpdateSchema = z.object({
  nome: ModalidadeFields.nome.schema.optional(),
  slug: ModalidadeFields.slug.schema.optional(),
});
