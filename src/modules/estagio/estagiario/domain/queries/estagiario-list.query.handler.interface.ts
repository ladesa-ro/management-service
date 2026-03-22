import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioListQuery } from "./estagiario-list.query";
import type { EstagiarioListQueryResult } from "./estagiario-list.query.result";

export const EstagiarioListQueryMetadata = createOperationMetadata({
  operationId: "estagiarioFindAll",
  summary: "Lista estagiários",
});

export const IEstagiarioListQueryHandler = Symbol("IEstagiarioListQueryHandler");

export type IEstagiarioListQueryHandler = IQueryHandler<
  EstagiarioListQuery | null,
  EstagiarioListQueryResult
>;
