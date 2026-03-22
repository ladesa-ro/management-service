import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const enderecoCepSchema = z
  .string()
  .min(1, "cep é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .pipe(z.string().regex(/^\d{8}$/, "cep deve conter exatamente 8 dígitos"));

export const enderecoLogradouroSchema = z.string().min(1, "logradouro é obrigatório");

export const enderecoNumeroSchema = z.number().int().min(0).max(99999);

export const enderecoBairroSchema = z.string().min(1, "bairro é obrigatório");

export const enderecoComplementoSchema = z.string().nullable().optional();

export const enderecoPontoReferenciaSchema = z.string().nullable().optional();

export const enderecoCidadeRefSchema = z.object({
  id: z.number().int(),
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const enderecoSchema = z
  .object({
    id: uuidSchema,
    cep: enderecoCepSchema,
    logradouro: enderecoLogradouroSchema,
    numero: enderecoNumeroSchema,
    bairro: enderecoBairroSchema,
    complemento: z.string().nullable(),
    pontoReferencia: z.string().nullable(),
    cidade: enderecoCidadeRefSchema,
  })
  .merge(datedSchema);

export const enderecoCreateSchema = z.object({
  cep: enderecoCepSchema,
  logradouro: enderecoLogradouroSchema,
  numero: enderecoNumeroSchema,
  bairro: enderecoBairroSchema,
  complemento: enderecoComplementoSchema,
  pontoReferencia: enderecoPontoReferenciaSchema,
  cidade: enderecoCidadeRefSchema,
});

export const enderecoUpdateSchema = z.object({
  cep: enderecoCepSchema.optional(),
  logradouro: enderecoLogradouroSchema.optional(),
  numero: enderecoNumeroSchema.optional(),
  bairro: enderecoBairroSchema.optional(),
  complemento: enderecoComplementoSchema,
  pontoReferencia: enderecoPontoReferenciaSchema,
  cidade: enderecoCidadeRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const enderecoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const enderecoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.cidade.id": stringFilterSchema,
});

export const enderecoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterCidadeId: z.array(z.string()).optional(),
});

// ============================================================================
// Schemas de input para create/update (presentation layer)
// ============================================================================

export const enderecoInputSchema = z.object({
  cep: enderecoCepSchema,
  logradouro: enderecoLogradouroSchema,
  numero: enderecoNumeroSchema,
  bairro: enderecoBairroSchema,
  complemento: enderecoComplementoSchema,
  pontoReferencia: enderecoPontoReferenciaSchema,
  cidade: enderecoCidadeRefSchema,
});
