/**
 * Estagiario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EstagiarioFields } from "./estagiario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const EstagiarioPerfilRefSchema = z.object({
  id: uuidSchema,
});

export const EstagiarioCursoRefSchema = z.object({
  id: uuidSchema,
});

export const EstagiarioTurmaRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstagiarioSchema = z
  .object({
    id: uuidSchema,
    perfil: EstagiarioPerfilRefSchema,
    curso: EstagiarioCursoRefSchema,
    turma: EstagiarioTurmaRefSchema,
    telefone: z.string().min(1).max(15),
    emailInstitucional: z.string().nullable(),
    dataNascimento: z.string(),
  })
  .merge(datedSchema);

export const EstagiarioCreateSchema = z.object({
  perfil: EstagiarioPerfilRefSchema,
  curso: EstagiarioCursoRefSchema,
  turma: EstagiarioTurmaRefSchema,
  telefone: EstagiarioFields.telefone.schema,
  emailInstitucional: EstagiarioFields.emailInstitucional.schema,
  dataNascimento: EstagiarioFields.dataNascimento.schema,
});

export const EstagiarioUpdateSchema = z.object({
  perfil: EstagiarioPerfilRefSchema.optional(),
  curso: EstagiarioCursoRefSchema.optional(),
  turma: EstagiarioTurmaRefSchema.optional(),
  telefone: EstagiarioFields.telefone.schema.optional(),
  emailInstitucional: EstagiarioFields.emailInstitucional.schema,
  dataNascimento: EstagiarioFields.dataNascimento.schema.optional(),
});
