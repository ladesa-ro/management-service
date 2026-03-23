/**
 * Estagiario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EstagiarioFields } from "./estagiario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const EstagiarioPerfilRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const EstagiarioCursoRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const EstagiarioTurmaRefSchema = createSchema(() => z.object({ id: uuidSchema }));

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstagiarioSchema = z
  .object({
    id: uuidSchema,
    perfil: z.object({ id: uuidSchema }),
    curso: z.object({ id: uuidSchema }),
    turma: z.object({ id: uuidSchema }),
    telefone: z.string().min(1).max(15),
    emailInstitucional: z.string().nullable(),
    dataNascimento: z.string(),
  })
  .merge(datedSchema);

export const EstagiarioCreateSchema = createSchema((standard) =>
  z.object({
    perfil: EstagiarioPerfilRefSchema.create(standard),
    curso: EstagiarioCursoRefSchema.create(standard),
    turma: EstagiarioTurmaRefSchema.create(standard),
    telefone: EstagiarioFields.telefone.create(standard),
    emailInstitucional: EstagiarioFields.emailInstitucional.create(standard),
    dataNascimento: EstagiarioFields.dataNascimento.create(standard),
  }),
);

export const EstagiarioUpdateSchema = createSchema((standard) =>
  z.object({
    perfil: EstagiarioPerfilRefSchema.create(standard).optional(),
    curso: EstagiarioCursoRefSchema.create(standard).optional(),
    turma: EstagiarioTurmaRefSchema.create(standard).optional(),
    telefone: EstagiarioFields.telefone.create(standard).optional(),
    emailInstitucional: EstagiarioFields.emailInstitucional.create(standard),
    dataNascimento: EstagiarioFields.dataNascimento.create(standard).optional(),
  }),
);
