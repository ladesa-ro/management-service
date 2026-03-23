/**
 * Arquivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ArquivoFields } from "./arquivo.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const ArquivoSchema = z
  .object({
    id: uuidSchema,
    name: ArquivoFields.name.domainSchema,
    mimeType: ArquivoFields.mimeType.domainSchema,
    sizeBytes: ArquivoFields.sizeBytes.domainSchema,
    storageType: ArquivoFields.storageType.domainSchema,
  })
  .merge(datedSchema);

export const ArquivoCreateSchema = createSchema((standard) =>
  z.object({
    name: ArquivoFields.name.create(standard),
    mimeType: ArquivoFields.mimeType.create(standard),
    sizeBytes: ArquivoFields.sizeBytes.create(standard),
    storageType: ArquivoFields.storageType.create(standard),
  }),
);

export const ArquivoUpdateSchema = createSchema((standard) =>
  z.object({
    name: ArquivoFields.name.create(standard).optional(),
    mimeType: ArquivoFields.mimeType.create(standard).optional(),
    sizeBytes: ArquivoFields.sizeBytes.create(standard).optional(),
    storageType: ArquivoFields.storageType.create(standard).optional(),
  }),
);
