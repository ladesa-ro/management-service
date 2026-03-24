/**
 * Imagem Arquivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { ImagemArquivoFields } from "./imagem-arquivo.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const ImagemArquivoImagemRefSchema = ObjectIdUuidFactory;

export const ImagemArquivoArquivoRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const ImagemArquivoSchema = z
  .object({
    id: uuidSchema,
    largura: ImagemArquivoFields.largura.domainSchema,
    altura: ImagemArquivoFields.altura.domainSchema,
    formato: ImagemArquivoFields.formato.domainSchema,
    mimeType: ImagemArquivoFields.mimeType.domainSchema,
    imagem: ObjectIdUuidFactory.domain,
    arquivo: ObjectIdUuidFactory.domain,
  })
  .extend(datedSchema.shape);

export const ImagemArquivoCreateSchema = createSchema((standard) =>
  z.object({
    largura: ImagemArquivoFields.largura.create(standard),
    altura: ImagemArquivoFields.altura.create(standard),
    formato: ImagemArquivoFields.formato.create(standard),
    mimeType: ImagemArquivoFields.mimeType.create(standard),
    imagem: ImagemArquivoImagemRefSchema.create(standard),
    arquivo: ImagemArquivoArquivoRefSchema.create(standard),
  }),
);

export const ImagemArquivoUpdateSchema = createSchema((standard) =>
  z.object({
    largura: ImagemArquivoFields.largura.create(standard).optional(),
    altura: ImagemArquivoFields.altura.create(standard).optional(),
    formato: ImagemArquivoFields.formato.create(standard).optional(),
    mimeType: ImagemArquivoFields.mimeType.create(standard).optional(),
  }),
);
