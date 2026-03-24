/**
 * Ambiente — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { AmbienteFields } from "./ambiente.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const AmbienteBlocoRefSchema = ObjectIdUuidFactory;

export const AmbienteImagemCapaRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const AmbienteSchema = z
  .object({
    id: uuidSchema,
    nome: AmbienteFields.nome.domainSchema,
    descricao: z.string().nullable(),
    codigo: AmbienteFields.codigo.domainSchema,
    capacidade: z.number().int().nullable(),
    tipo: z.string().nullable(),
    bloco: ObjectIdUuidFactory.domain.loose(),
    imagemCapa: ObjectIdUuidFactory.domain.loose().nullable(),
  })
  .extend(datedSchema.shape);

export const AmbienteCreateSchema = createSchema((standard) =>
  z.object({
    nome: AmbienteFields.nome.create(standard),
    descricao: AmbienteFields.descricao.create(standard),
    codigo: AmbienteFields.codigo.create(standard),
    capacidade: AmbienteFields.capacidade.create(standard),
    tipo: AmbienteFields.tipo.create(standard),
    bloco: AmbienteBlocoRefSchema.create(standard),
  }),
);

export const AmbienteUpdateSchema = createSchema((standard) =>
  z.object({
    nome: AmbienteFields.nome.create(standard).optional(),
    descricao: AmbienteFields.descricao.create(standard),
    codigo: AmbienteFields.codigo.create(standard).optional(),
    capacidade: AmbienteFields.capacidade.create(standard),
    tipo: AmbienteFields.tipo.create(standard),
    bloco: AmbienteBlocoRefSchema.create(standard).optional(),
  }),
);
