import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EmpresaAvaliacaoFields } from "./empresa-avaliacao.fields";

export const EmpresaAvaliacaoSchema = z
  .object({
    id: uuidSchema,
    empresa: ObjectIdUuidFactory.domain,
    estagiario: ObjectIdUuidFactory.domain,
    rating: z.number().int().min(1).max(5),
    comentario: z.string().max(2000).nullable().optional(),
    relevanceScore: z.number().min(0).default(0),
    likesCount: z.number().int().min(0).default(0),
  })
  .extend(datedSchema.shape);

export const EmpresaAvaliacaoCreateSchema = createSchema((standard) =>
  z.object({
    empresa: ObjectIdUuidFactory.create(standard),
    estagiario: ObjectIdUuidFactory.create(standard),
    rating: EmpresaAvaliacaoFields.rating.create(standard),
    comentario: EmpresaAvaliacaoFields.comentario.create(standard),
  }),
);

export const EmpresaAvaliacaoUpdateSchema = createSchema((standard) =>
  z.object({
    rating: EmpresaAvaliacaoFields.rating.create(standard).optional(),
    comentario: EmpresaAvaliacaoFields.comentario.create(standard),
  }),
);
