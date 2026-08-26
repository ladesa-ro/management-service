import { z } from "zod";
import { RelatorioUpdateSchema } from "../relatorio.schemas";

export type RelatorioUpdateCommand = z.infer<typeof RelatorioUpdateSchema>;
