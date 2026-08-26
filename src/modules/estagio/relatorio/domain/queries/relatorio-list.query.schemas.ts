import { z } from "zod";
import { createPaginationInputSchema } from "@/shared/validation";

export const RelatorioListQuerySchema = createPaginationInputSchema();
export type RelatorioListQueryInput = z.infer<typeof RelatorioListQuerySchema>;
