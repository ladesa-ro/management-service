import { z } from "zod";
import { RelatorioCreateSchema } from "../relatorio.schemas";

export type RelatorioCreateCommand = z.infer<typeof RelatorioCreateSchema>;
