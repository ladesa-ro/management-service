import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const campusNomeFantasiaSchema = z.string().min(1, "nomeFantasia é obrigatório");

export const campusRazaoSocialSchema = z.string().min(1, "razaoSocial é obrigatório");

export const campusApelidoSchema = z.string().min(1, "apelido é obrigatório");

export const campusCnpjSchema = z
  .string()
  .min(1, "cnpj é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .pipe(z.string().regex(/^\d{14}$/, "cnpj deve conter exatamente 14 dígitos"));

export const campusEnderecoRefSchema = z.object({
  cep: z.string().min(1),
  logradouro: z.string().min(1),
  numero: z.number().int().min(0),
  bairro: z.string().min(1),
  complemento: z.string().nullable().optional(),
  pontoReferencia: z.string().nullable().optional(),
  cidade: z.object({ id: z.number().int() }),
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const campusSchema = z
  .object({
    id: uuidSchema,
    nomeFantasia: campusNomeFantasiaSchema,
    razaoSocial: campusRazaoSocialSchema,
    apelido: campusApelidoSchema,
    cnpj: campusCnpjSchema,
    endereco: z
      .object({
        id: uuidSchema,
        cep: z.string(),
        logradouro: z.string(),
        numero: z.number().int(),
        bairro: z.string(),
        complemento: z.string().nullable(),
        pontoReferencia: z.string().nullable(),
        cidade: z.object({ id: z.number().int() }).passthrough(),
      })
      .passthrough(),
  })
  .merge(datedSchema);

export const campusCreateSchema = z.object({
  nomeFantasia: campusNomeFantasiaSchema,
  razaoSocial: campusRazaoSocialSchema,
  apelido: campusApelidoSchema,
  cnpj: campusCnpjSchema,
  endereco: campusEnderecoRefSchema,
});

export const campusUpdateSchema = z.object({
  nomeFantasia: campusNomeFantasiaSchema.optional(),
  razaoSocial: campusRazaoSocialSchema.optional(),
  apelido: campusApelidoSchema.optional(),
  cnpj: campusCnpjSchema.optional(),
  endereco: campusEnderecoRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const campusFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const campusPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
});

export const campusGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
});

// ============================================================================
// Schemas de input para create/update (presentation layer)
// ============================================================================

export const campusInputCreateSchema = z.object({
  nomeFantasia: campusNomeFantasiaSchema,
  razaoSocial: campusRazaoSocialSchema,
  apelido: campusApelidoSchema,
  cnpj: campusCnpjSchema,
  endereco: campusEnderecoRefSchema,
});

export const campusInputUpdateSchema = campusInputCreateSchema.partial();
