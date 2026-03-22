/**
 * Curso — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CursoFields } from "./curso.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CursoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const CursoOfertaFormacaoRefSchema = z.object({
  id: uuidSchema,
});

export const CursoImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const CursoSchema = z
  .object({
    id: uuidSchema,
    nome: CursoFields.nome.schema,
    nomeAbreviado: CursoFields.nomeAbreviado.schema,
    campus: CursoCampusRefSchema,
    ofertaFormacao: CursoOfertaFormacaoRefSchema,
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const CursoCreateSchema = z.object({
  nome: CursoFields.nome.schema,
  nomeAbreviado: CursoFields.nomeAbreviado.schema,
  campus: CursoCampusRefSchema,
  ofertaFormacao: CursoOfertaFormacaoRefSchema,
  imagemCapa: CursoImagemCapaRefSchema,
});

export const CursoUpdateSchema = z.object({
  nome: CursoFields.nome.schema.optional(),
  nomeAbreviado: CursoFields.nomeAbreviado.schema.optional(),
  campus: CursoCampusRefSchema.optional(),
  ofertaFormacao: CursoOfertaFormacaoRefSchema.optional(),
  imagemCapa: CursoImagemCapaRefSchema,
});
