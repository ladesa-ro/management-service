/**
 * Empresa — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EmpresaFields } from "./empresa.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const EmpresaEnderecoRefSchema = createSchema(() => z.object({ id: uuidSchema }));

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
    endereco: z.object({ id: uuidSchema }),
  })
  .merge(datedSchema);

export const EmpresaCreateSchema = createSchema((standard) =>
  z.object({
    razaoSocial: EmpresaFields.razaoSocial.create(standard),
    nomeFantasia: EmpresaFields.nomeFantasia.create(standard),
    cnpj: EmpresaFields.cnpj.create(standard),
    telefone: EmpresaFields.telefone.create(standard),
    email: EmpresaFields.email.create(standard),
    endereco: EmpresaEnderecoRefSchema.create(standard),
  }),
);

export const EmpresaUpdateSchema = createSchema((standard) =>
  z.object({
    razaoSocial: EmpresaFields.razaoSocial.create(standard).optional(),
    nomeFantasia: EmpresaFields.nomeFantasia.create(standard).optional(),
    cnpj: EmpresaFields.cnpj.create(standard).optional(),
    telefone: EmpresaFields.telefone.create(standard).optional(),
    email: EmpresaFields.email.create(standard).optional(),
    endereco: EmpresaEnderecoRefSchema.create(standard).optional(),
  }),
);
