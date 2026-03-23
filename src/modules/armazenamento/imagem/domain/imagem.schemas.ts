/**
 * Imagem — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ImagemFields } from "./imagem.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const ImagemSchema = z
  .object({
    id: uuidSchema,
    descricao: z.string().nullable(),
  })
  .merge(datedSchema);

export const ImagemCreateSchema = createSchema((standard) =>
  z.object({
    descricao: ImagemFields.descricao.create(standard),
  }),
);

export const ImagemUpdateSchema = createSchema((standard) =>
  z.object({
    descricao: ImagemFields.descricao.create(standard),
  }),
);
