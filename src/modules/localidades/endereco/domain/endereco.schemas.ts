/**
 * Endereco — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const EnderecoCepSchema = z
  .string()
  .min(1, "cep é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .pipe(z.string().regex(/^\d{8}$/, "cep deve conter exatamente 8 dígitos"));

export const EnderecoLogradouroSchema = z.string().min(1, "logradouro é obrigatório");

export const EnderecoNumeroSchema = z.number().int().min(0).max(99999);

export const EnderecoBairroSchema = z.string().min(1, "bairro é obrigatório");

export const EnderecoComplementoSchema = z.string().nullable().optional();

export const EnderecoPontoReferenciaSchema = z.string().nullable().optional();

export const EnderecoCidadeRefSchema = z.object({
  id: z.number().int(),
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const EnderecoSchema = z
  .object({
    id: uuidSchema,
    cep: EnderecoCepSchema,
    logradouro: EnderecoLogradouroSchema,
    numero: EnderecoNumeroSchema,
    bairro: EnderecoBairroSchema,
    complemento: z.string().nullable(),
    pontoReferencia: z.string().nullable(),
    cidade: EnderecoCidadeRefSchema,
  })
  .merge(datedSchema);

export const EnderecoCreateSchema = z.object({
  cep: EnderecoCepSchema,
  logradouro: EnderecoLogradouroSchema,
  numero: EnderecoNumeroSchema,
  bairro: EnderecoBairroSchema,
  complemento: EnderecoComplementoSchema,
  pontoReferencia: EnderecoPontoReferenciaSchema,
  cidade: EnderecoCidadeRefSchema,
});

export const EnderecoUpdateSchema = z.object({
  cep: EnderecoCepSchema.optional(),
  logradouro: EnderecoLogradouroSchema.optional(),
  numero: EnderecoNumeroSchema.optional(),
  bairro: EnderecoBairroSchema.optional(),
  complemento: EnderecoComplementoSchema,
  pontoReferencia: EnderecoPontoReferenciaSchema,
  cidade: EnderecoCidadeRefSchema.optional(),
});

export const EnderecoInputSchema = z.object({
  cep: EnderecoCepSchema,
  logradouro: EnderecoLogradouroSchema,
  numero: EnderecoNumeroSchema,
  bairro: EnderecoBairroSchema,
  complemento: EnderecoComplementoSchema,
  pontoReferencia: EnderecoPontoReferenciaSchema,
  cidade: EnderecoCidadeRefSchema,
});
