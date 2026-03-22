/**
 * Turma — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { TurmaFields } from "./turma.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const TurmaCursoRefSchema = z.object({
  id: uuidSchema,
});

export const TurmaAmbientePadraoAulaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

export const TurmaImagemCapaRefSchema = z.object({ id: uuidSchema }).nullable().optional();

// ============================================================================
// Schemas compostos
// ============================================================================

export const TurmaSchema = z
  .object({
    id: uuidSchema,
    periodo: TurmaFields.periodo.schema,
    curso: TurmaCursoRefSchema,
    ambientePadraoAula: z.object({ id: uuidSchema }).nullable(),
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const TurmaCreateSchema = z.object({
  periodo: TurmaFields.periodo.schema,
  nome: TurmaFields.nome.schema,
  curso: TurmaCursoRefSchema,
  ambientePadraoAula: TurmaAmbientePadraoAulaRefSchema,
  imagemCapa: TurmaImagemCapaRefSchema,
});

export const TurmaUpdateSchema = z.object({
  periodo: TurmaFields.periodo.schema.optional(),
  nome: TurmaFields.nome.schema,
  curso: TurmaCursoRefSchema.optional(),
  ambientePadraoAula: TurmaAmbientePadraoAulaRefSchema,
  imagemCapa: TurmaImagemCapaRefSchema,
});
