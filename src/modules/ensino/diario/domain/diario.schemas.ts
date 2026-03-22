/**
 * Diario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioFields } from "./diario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioCalendarioLetivoRefSchema = z.object({
  id: uuidSchema,
});

export const DiarioTurmaRefSchema = z.object({
  id: uuidSchema,
});

export const DiarioDisciplinaRefSchema = z.object({
  id: uuidSchema,
});

export const DiarioAmbientePadraoRefSchema = z.object({
  id: uuidSchema,
});

export const DiarioImagemCapaRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioSchema = z
  .object({
    id: uuidSchema,
    ativo: DiarioFields.ativo.schema,
    calendarioLetivo: DiarioCalendarioLetivoRefSchema,
    turma: DiarioTurmaRefSchema,
    disciplina: DiarioDisciplinaRefSchema,
    ambientePadrao: DiarioAmbientePadraoRefSchema.nullable(),
    imagemCapa: DiarioImagemCapaRefSchema.nullable(),
  })
  .merge(datedSchema);

export const DiarioCreateSchema = z.object({
  ativo: DiarioFields.ativo.schema.optional().default(true),
  calendarioLetivo: DiarioCalendarioLetivoRefSchema,
  turma: DiarioTurmaRefSchema,
  disciplina: DiarioDisciplinaRefSchema,
  ambientePadrao: DiarioAmbientePadraoRefSchema.nullable().optional(),
});

export const DiarioUpdateSchema = z.object({
  ativo: DiarioFields.ativo.schema.optional(),
  calendarioLetivo: DiarioCalendarioLetivoRefSchema.optional(),
  turma: DiarioTurmaRefSchema.optional(),
  disciplina: DiarioDisciplinaRefSchema.optional(),
  ambientePadrao: DiarioAmbientePadraoRefSchema.nullable().optional(),
});
