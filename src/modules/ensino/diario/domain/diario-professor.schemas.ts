/**
 * Diario Professor — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioProfessorFields } from "./diario-professor.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioProfessorDiarioRefSchema = z.object({
  id: uuidSchema,
});

export const DiarioProfessorPerfilRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioProfessorSchema = z
  .object({
    id: uuidSchema,
    situacao: DiarioProfessorFields.situacao.schema,
    diario: DiarioProfessorDiarioRefSchema,
    perfil: DiarioProfessorPerfilRefSchema,
  })
  .merge(datedSchema);

export const DiarioProfessorCreateSchema = z.object({
  situacao: DiarioProfessorFields.situacao.schema,
  diario: DiarioProfessorDiarioRefSchema,
  perfil: DiarioProfessorPerfilRefSchema,
});

export const DiarioProfessorUpdateSchema = z.object({
  situacao: DiarioProfessorFields.situacao.schema.optional(),
  diario: DiarioProfessorDiarioRefSchema.optional(),
  perfil: DiarioProfessorPerfilRefSchema.optional(),
});
