import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioFindOneQuery } from "./estagiario-find-one.query";
import type { EstagiarioFindOneQueryResult } from "./estagiario-find-one.query.result";

export const EstagiarioFindOneQueryMetadata = createOperationMetadata({
  operationId: "estagiarioFindById",
  summary: "Busca um estagiário por ID",
});

export const IEstagiarioFindOneQueryHandler = Symbol("IEstagiarioFindOneQueryHandler");

export type IEstagiarioFindOneQueryHandler = IQueryHandler<
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult | null
>;
