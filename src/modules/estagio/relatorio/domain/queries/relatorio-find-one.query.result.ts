import type { z } from "zod";
import type { EntityQueryResult } from "@/domain/abstractions";
import type { RelatorioSchema } from "../relatorio.schemas";

export type RelatorioFindOneQueryResult = EntityQueryResult &
  z.infer<typeof RelatorioSchema> & {
    estagio: { id: string };
    arquivo?: {
      id: string;
      name?: string | null;
      mimeType?: string | null;
      sizeBytes?: number | null;
    } | null;
  };
