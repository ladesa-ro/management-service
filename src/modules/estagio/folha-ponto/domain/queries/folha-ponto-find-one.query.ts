import type { IFindOneQuery } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

export const FolhaPontoFindOneQueryMetadata = createOperationMetadata({
  operationId: "folhaPontoFindById",
  summary: "Busca uma folha de ponto pelo ID",
});

export type FolhaPontoFindOneQuery = IFindOneQuery;
