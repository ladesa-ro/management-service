/**
 * Ambiente — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { AmbienteFields } from "./ambiente.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const AmbienteBlocoRefSchema = z.object({
  id: uuidSchema,
});

export const AmbienteImagemCapaRefSchema = z
  .object({
    id: uuidSchema,
  })
  .nullable();

// ============================================================================
// Schemas compostos
// ============================================================================

export const AmbienteSchema = z
  .object({
    id: uuidSchema,
    nome: AmbienteFields.nome.schema,
    descricao: z.string().nullable(),
    codigo: AmbienteFields.codigo.schema,
    capacidade: z.number().int().nullable(),
    tipo: z.string().nullable(),
    bloco: z.object({ id: uuidSchema }).passthrough(),
    imagemCapa: z.object({ id: uuidSchema }).passthrough().nullable(),
  })
  .merge(datedSchema);

export const AmbienteCreateSchema = z.object({
  nome: AmbienteFields.nome.schema,
  descricao: AmbienteFields.descricao.schema,
  codigo: AmbienteFields.codigo.schema,
  capacidade: AmbienteFields.capacidade.schema,
  tipo: AmbienteFields.tipo.schema,
  bloco: AmbienteBlocoRefSchema,
});

export const AmbienteUpdateSchema = z.object({
  nome: AmbienteFields.nome.schema.optional(),
  descricao: AmbienteFields.descricao.schema,
  codigo: AmbienteFields.codigo.schema.optional(),
  capacidade: AmbienteFields.capacidade.schema,
  tipo: AmbienteFields.tipo.schema,
  bloco: AmbienteBlocoRefSchema.optional(),
});
