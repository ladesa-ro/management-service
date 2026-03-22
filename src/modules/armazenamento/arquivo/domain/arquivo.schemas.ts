/**
 * Arquivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ArquivoFields } from "./arquivo.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const ArquivoSchema = z
  .object({
    id: uuidSchema,
    name: ArquivoFields.name.schema,
    mimeType: ArquivoFields.mimeType.schema,
    sizeBytes: ArquivoFields.sizeBytes.schema,
    storageType: ArquivoFields.storageType.schema,
  })
  .merge(datedSchema);

export const ArquivoCreateSchema = z.object({
  name: ArquivoFields.name.schema,
  mimeType: ArquivoFields.mimeType.schema,
  sizeBytes: ArquivoFields.sizeBytes.schema,
  storageType: ArquivoFields.storageType.schema,
});

export const ArquivoUpdateSchema = z.object({
  name: ArquivoFields.name.schema.optional(),
  mimeType: ArquivoFields.mimeType.schema.optional(),
  sizeBytes: ArquivoFields.sizeBytes.schema.optional(),
  storageType: ArquivoFields.storageType.schema.optional(),
});
