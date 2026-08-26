import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";

export const RelatorioFindOneQuerySchema = z.object({
  id: uuidSchema,
});
