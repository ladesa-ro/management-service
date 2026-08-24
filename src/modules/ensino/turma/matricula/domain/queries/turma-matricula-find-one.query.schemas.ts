import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";

export const TurmaMatriculaFindOneInputSchema = z.object({
  id: uuidSchema,
});
