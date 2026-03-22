import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const diarioProfessorSituacaoSchema = z.boolean();

export const diarioProfessorDiarioRefSchema = z.object({
  id: uuidSchema,
});

export const diarioProfessorPerfilRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const diarioProfessorSchema = z
  .object({
    id: uuidSchema,
    situacao: diarioProfessorSituacaoSchema,
    diario: diarioProfessorDiarioRefSchema,
    perfil: diarioProfessorPerfilRefSchema,
  })
  .merge(datedSchema);

export const diarioProfessorCreateSchema = z.object({
  situacao: diarioProfessorSituacaoSchema,
  diario: diarioProfessorDiarioRefSchema,
  perfil: diarioProfessorPerfilRefSchema,
});

export const diarioProfessorUpdateSchema = z.object({
  situacao: diarioProfessorSituacaoSchema.optional(),
  diario: diarioProfessorDiarioRefSchema.optional(),
  perfil: diarioProfessorPerfilRefSchema.optional(),
});
