import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";

/** Path params de /matriculas/:id */
export const TurmaMatriculaFindOneInputSchema = z.object({
  id: uuidSchema,
});
