import type { FindOneQuery } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

export const RelatorioFindOneQueryMetadata = createOperationMetadata({
  operationId: "relatorioFindById",
  summary: "Busca um relatório de estágio pelo ID",
});

export type RelatorioFindOneQuery = FindOneQuery;
