import { z } from "zod";
import { uuidFilterSchema } from "@/shared/validation/schemas";
import { FolhaPontoStatusSchema } from "../folha-ponto.fields";

export const folhaPontoListQueryFilterSchema = z.object({
  status: z.array(FolhaPontoStatusSchema).optional(),
  estagio: uuidFilterSchema,
});
