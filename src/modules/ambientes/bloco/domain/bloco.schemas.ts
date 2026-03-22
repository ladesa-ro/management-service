/**
 * Bloco — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { BlocoFields } from "./bloco.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const BlocoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const BlocoImagemCapaRefSchema = z
  .object({
    id: uuidSchema,
  })
  .nullable();

// ============================================================================
// Schemas compostos
// ============================================================================

export const BlocoSchema = z
  .object({
    id: uuidSchema,
    nome: BlocoFields.nome.schema,
    codigo: BlocoFields.codigo.schema,
    campus: z.object({ id: uuidSchema }).passthrough(),
    imagemCapa: z.object({ id: uuidSchema }).passthrough().nullable(),
  })
  .merge(datedSchema);

export const BlocoCreateSchema = z.object({
  nome: BlocoFields.nome.schema,
  codigo: BlocoFields.codigo.schema,
  campus: BlocoCampusRefSchema,
});

export const BlocoUpdateSchema = z.object({
  nome: BlocoFields.nome.schema.optional(),
  codigo: BlocoFields.codigo.schema.optional(),
  campus: BlocoCampusRefSchema.optional(),
});
