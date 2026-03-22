import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const empresaRazaoSocialSchema = z.string().min(1, "razão social é obrigatória");

export const empresaNomeFantasiaSchema = z.string().min(1, "nome fantasia é obrigatório");

export const empresaCnpjSchema = z
  .string()
  .min(1, "CNPJ é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .pipe(z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"));

export const empresaTelefoneSchema = z
  .string()
  .min(1, "telefone é obrigatório")
  .max(15, "telefone deve ter no máximo 15 caracteres");

export const empresaEmailSchema = z.string().email("email inválido");

export const empresaIdEnderecoFkSchema = uuidSchema;

// ============================================================================
// Schemas compostos
// ============================================================================

export const empresaSchema = z
  .object({
    id: uuidSchema,
    razaoSocial: z.string().min(1),
    nomeFantasia: z.string().min(1),
    cnpj: z.string(),
    telefone: z.string().min(1).max(15),
    email: z.string().email(),
    idEnderecoFk: uuidSchema,
  })
  .merge(datedSchema);

export const empresaCreateSchema = z.object({
  razaoSocial: empresaRazaoSocialSchema,
  nomeFantasia: empresaNomeFantasiaSchema,
  cnpj: empresaCnpjSchema,
  telefone: empresaTelefoneSchema,
  email: empresaEmailSchema,
  idEnderecoFk: empresaIdEnderecoFkSchema,
});

export const empresaUpdateSchema = z.object({
  razaoSocial: empresaRazaoSocialSchema.optional(),
  nomeFantasia: empresaNomeFantasiaSchema.optional(),
  cnpj: empresaCnpjSchema.optional(),
  telefone: empresaTelefoneSchema.optional(),
  email: empresaEmailSchema.optional(),
  idEnderecoFk: empresaIdEnderecoFkSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const empresaFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const empresaPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.cnpj": stringFilterSchema,
  "filter.nomeFantasia": stringFilterSchema,
  "filter.idEnderecoFk": stringFilterSchema,
});

export const empresaGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterCnpj: z.array(z.string()).optional(),
  filterNomeFantasia: z.array(z.string()).optional(),
  filterIdEnderecoFk: z.array(z.string()).optional(),
});
