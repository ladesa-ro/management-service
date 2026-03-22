/**
 * Empresa — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EmpresaFields } from "./empresa.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const EmpresaEnderecoRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const EmpresaSchema = z
  .object({
    id: uuidSchema,
    razaoSocial: z.string().min(1),
    nomeFantasia: z.string().min(1),
    cnpj: z.string(),
    telefone: z.string().min(1).max(15),
    email: z.string().email(),
    endereco: EmpresaEnderecoRefSchema,
  })
  .merge(datedSchema);

export const EmpresaCreateSchema = z.object({
  razaoSocial: EmpresaFields.razaoSocial.schema,
  nomeFantasia: EmpresaFields.nomeFantasia.schema,
  cnpj: EmpresaFields.cnpj.schema,
  telefone: EmpresaFields.telefone.schema,
  email: EmpresaFields.email.schema,
  endereco: EmpresaEnderecoRefSchema,
});

export const EmpresaUpdateSchema = z.object({
  razaoSocial: EmpresaFields.razaoSocial.schema.optional(),
  nomeFantasia: EmpresaFields.nomeFantasia.schema.optional(),
  cnpj: EmpresaFields.cnpj.schema.optional(),
  telefone: EmpresaFields.telefone.schema.optional(),
  email: EmpresaFields.email.schema.optional(),
  endereco: EmpresaEnderecoRefSchema.optional(),
});
