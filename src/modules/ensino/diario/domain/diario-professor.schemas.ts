/**
 * Diario Professor — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioProfessorFields } from "./diario-professor.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioProfessorDiarioRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const DiarioProfessorPerfilRefSchema = createSchema(() => z.object({ id: uuidSchema }));

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioProfessorSchema = z
  .object({
    id: uuidSchema,
    situacao: DiarioProfessorFields.situacao.domainSchema,
    diario: z.object({ id: uuidSchema }).passthrough(),
    perfil: z.object({ id: uuidSchema }).passthrough(),
  })
  .merge(datedSchema);

export const DiarioProfessorCreateSchema = createSchema((standard) =>
  z.object({
    situacao: DiarioProfessorFields.situacao.create(standard),
    diario: DiarioProfessorDiarioRefSchema.create(standard),
    perfil: DiarioProfessorPerfilRefSchema.create(standard),
  }),
);

export const DiarioProfessorUpdateSchema = createSchema((standard) =>
  z.object({
    situacao: DiarioProfessorFields.situacao.create(standard).optional(),
    diario: DiarioProfessorDiarioRefSchema.create(standard).optional(),
    perfil: DiarioProfessorPerfilRefSchema.create(standard).optional(),
  }),
);
