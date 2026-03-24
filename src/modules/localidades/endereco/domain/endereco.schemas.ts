/**
 * Endereco — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdIntFactory, safeInt } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const EnderecoCepSchema = createSchema(() =>
  z
    .string()
    .min(1, "cep é obrigatório")
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{8}$/, "cep deve conter exatamente 8 dígitos")),
);

export const EnderecoLogradouroSchema = createSchema(() =>
  z.string().min(1, "logradouro é obrigatório"),
);

export const EnderecoNumeroSchema = createSchema((standard) =>
  safeInt(standard, (s) => s.min(0).max(99999)),
);

export const EnderecoBairroSchema = createSchema(() => z.string().min(1, "bairro é obrigatório"));

export const EnderecoComplementoSchema = createSchema(() => z.string().nullable().optional());

export const EnderecoPontoReferenciaSchema = createSchema(() => z.string().nullable().optional());

export const EnderecoCidadeRefSchema = createSchema((standard) =>
  z.object({
    id: safeInt(standard),
  }),
);

// ============================================================================
// Schemas compostos
// ============================================================================

export const EnderecoSchema = z
  .object({
    id: uuidSchema,
    cep: EnderecoCepSchema.domain,
    logradouro: EnderecoLogradouroSchema.domain,
    numero: EnderecoNumeroSchema.domain,
    bairro: EnderecoBairroSchema.domain,
    complemento: z.string().nullable(),
    pontoReferencia: z.string().nullable(),
    cidade: ObjectIdIntFactory.domain,
  })
  .extend(datedSchema.shape);

export const EnderecoCreateSchema = createSchema((standard) =>
  z.object({
    cep: EnderecoCepSchema.create(standard),
    logradouro: EnderecoLogradouroSchema.create(standard),
    numero: EnderecoNumeroSchema.create(standard),
    bairro: EnderecoBairroSchema.create(standard),
    complemento: EnderecoComplementoSchema.create(standard),
    pontoReferencia: EnderecoPontoReferenciaSchema.create(standard),
    cidade: EnderecoCidadeRefSchema.create(standard),
  }),
);

export const EnderecoUpdateSchema = createSchema((standard) =>
  z.object({
    cep: EnderecoCepSchema.create(standard).optional(),
    logradouro: EnderecoLogradouroSchema.create(standard).optional(),
    numero: EnderecoNumeroSchema.create(standard).optional(),
    bairro: EnderecoBairroSchema.create(standard).optional(),
    complemento: EnderecoComplementoSchema.create(standard),
    pontoReferencia: EnderecoPontoReferenciaSchema.create(standard),
    cidade: EnderecoCidadeRefSchema.create(standard).optional(),
  }),
);

export const EnderecoInputSchema = createSchema((standard) =>
  z.object({
    cep: EnderecoCepSchema.create(standard),
    logradouro: EnderecoLogradouroSchema.create(standard),
    numero: EnderecoNumeroSchema.create(standard),
    bairro: EnderecoBairroSchema.create(standard),
    complemento: EnderecoComplementoSchema.create(standard),
    pontoReferencia: EnderecoPontoReferenciaSchema.create(standard),
    cidade: EnderecoCidadeRefSchema.create(standard),
  }),
);
