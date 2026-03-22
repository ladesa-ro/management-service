import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioFindOneQuery } from "./diario-find-one.query";
import type { DiarioFindOneQueryResult } from "./diario-find-one.query.result";

export const DiarioFindOneQueryMetadata = createOperationMetadata({
  operationId: "diarioFindById",
  summary: "Busca um diario por ID",
});

export const IDiarioFindOneQueryHandler = Symbol("IDiarioFindOneQueryHandler");

export type IDiarioFindOneQueryHandler = IQueryHandler<
  DiarioFindOneQuery,
  DiarioFindOneQueryResult | null
>;
