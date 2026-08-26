import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EmpresaScoreFields } from "./empresa-score.fields";

export const EmpresaScoreSchema = z
  .object({
    id: uuidSchema,
    empresa: ObjectIdUuidFactory.domain,
    score: z.number().min(0).max(100),
    averageRating: z.number().min(0).max(5),
    totalReviews: z.number().int().min(0),
    distribution: z.object({
      1: z.number().int().min(0),
      2: z.number().int().min(0),
      3: z.number().int().min(0),
      4: z.number().int().min(0),
      5: z.number().int().min(0),
    }),
    scoreVersion: z.number().int().min(1),
    indicators: z.record(z.string(), z.any()).optional().nullable(),
    calculatedAt: z.string(),
  })
  .extend(datedSchema.shape);

export const EmpresaScoreCreateSchema = createSchema((standard) =>
  z.object({
    empresa: ObjectIdUuidFactory.create(standard),
    score: EmpresaScoreFields.score.create(standard),
    averageRating: EmpresaScoreFields.averageRating.create(standard),
    totalReviews: EmpresaScoreFields.totalReviews.create(standard),
    distribution: EmpresaScoreFields.distribution.create(standard),
    scoreVersion: EmpresaScoreFields.scoreVersion.create(standard),
    indicators: z.record(z.string(), z.any()).optional().nullable(),
    calculatedAt: z.string(),
  }),
);
