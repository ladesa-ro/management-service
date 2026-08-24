import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

export const TurmaMatriculaSchema = z
  .object({
    id: uuidSchema,
    turma: ObjectIdUuidFactory.domain,
    perfil: ObjectIdUuidFactory.domain,
  })
  .extend(datedSchema.shape);

export const TurmaMatriculaCreateSchema = createSchema((standard) =>
  z.object({
    turma: ObjectIdUuidFactory.create(standard),
    perfil: ObjectIdUuidFactory.create(standard),
  }),
);
