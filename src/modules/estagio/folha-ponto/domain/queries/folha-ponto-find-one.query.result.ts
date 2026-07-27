import type { z } from "zod";
import type { EntityQueryResult } from "@/domain/abstractions";
import type { FolhaPontoSchema } from "../folha-ponto.schemas";

export type FolhaPontoFindOneQueryResult = EntityQueryResult &
  z.infer<typeof FolhaPontoSchema> & {
    estagio: { id: string };
  };
