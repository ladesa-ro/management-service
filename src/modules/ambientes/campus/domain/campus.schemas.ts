/**
 * Campus — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CampusFields } from "./campus.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CampusEnderecoRefSchema = z.object({
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

export const CampusSchema = z
  .object({
    id: uuidSchema,
    nomeFantasia: CampusFields.nomeFantasia.schema,
    razaoSocial: CampusFields.razaoSocial.schema,
    apelido: CampusFields.apelido.schema,
    cnpj: CampusFields.cnpj.schema,
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

export const CampusCreateSchema = z.object({
  nomeFantasia: CampusFields.nomeFantasia.schema,
  razaoSocial: CampusFields.razaoSocial.schema,
  apelido: CampusFields.apelido.schema,
  cnpj: CampusFields.cnpj.schema,
  endereco: CampusEnderecoRefSchema,
});

export const CampusUpdateSchema = z.object({
  nomeFantasia: CampusFields.nomeFantasia.schema.optional(),
  razaoSocial: CampusFields.razaoSocial.schema.optional(),
  apelido: CampusFields.apelido.schema.optional(),
  cnpj: CampusFields.cnpj.schema.optional(),
  endereco: CampusEnderecoRefSchema.optional(),
});
