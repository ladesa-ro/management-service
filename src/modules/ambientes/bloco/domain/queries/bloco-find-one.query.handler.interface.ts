import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";
import type { BlocoFindOneQueryResult } from "./bloco-find-one.query.result";

export const BlocoFindOneQueryMetadata = createOperationMetadata({
  operationId: "blocoFindById",
  summary: "Busca um bloco por ID",
});

export const IBlocoFindOneQueryHandler = Symbol("IBlocoFindOneQueryHandler");

export type IBlocoFindOneQueryHandler = IQueryHandler<
  BlocoFindOneQuery,
  BlocoFindOneQueryResult | null
>;
