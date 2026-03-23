/**
 * Campus — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, safeInt } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CampusFields } from "./campus.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CampusEnderecoRefSchema = createSchema((standard) => {
  const numero = safeInt(standard, (s) => s.min(0));
  const cidadeId = safeInt(standard);

  return z.object({
    cep: z.string().min(1),
    logradouro: z.string().min(1),
    numero,
    bairro: z.string().min(1),
    complemento: z.string().nullable().optional(),
    pontoReferencia: z.string().nullable().optional(),
    cidade: z.object({ id: cidadeId }),
  });
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const CampusSchema = z
  .object({
    id: uuidSchema,
    nomeFantasia: CampusFields.nomeFantasia.domainSchema,
    razaoSocial: CampusFields.razaoSocial.domainSchema,
    apelido: CampusFields.apelido.domainSchema,
    cnpj: CampusFields.cnpj.domainSchema,
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

export const CampusCreateSchema = createSchema((standard) =>
  z.object({
    nomeFantasia: CampusFields.nomeFantasia.create(standard),
    razaoSocial: CampusFields.razaoSocial.create(standard),
    apelido: CampusFields.apelido.create(standard),
    cnpj: CampusFields.cnpj.create(standard),
    endereco: CampusEnderecoRefSchema.create(standard),
  }),
);

export const CampusUpdateSchema = createSchema((standard) =>
  z.object({
    nomeFantasia: CampusFields.nomeFantasia.create(standard).optional(),
    razaoSocial: CampusFields.razaoSocial.create(standard).optional(),
    apelido: CampusFields.apelido.create(standard).optional(),
    cnpj: CampusFields.cnpj.create(standard).optional(),
    endereco: CampusEnderecoRefSchema.create(standard).optional(),
  }),
);
