/**
 * TurmaMatricula — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Schema completo do aggregate (para load)
// ============================================================================

export const TurmaMatriculaSchema = z
  .object({
    id: uuidSchema,
    turma: ObjectIdUuidFactory.domain,
    perfil: ObjectIdUuidFactory.domain,
  })
  .extend(datedSchema.shape);

// ============================================================================
// Create
// ============================================================================

export const TurmaMatriculaCreateSchema = createSchema((standard) =>
  z.object({
    turma: ObjectIdUuidFactory.create(standard),
    perfil: ObjectIdUuidFactory.create(standard),
  }),
);
