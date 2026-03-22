import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioListQuery } from "./diario-list.query";
import type { DiarioListQueryResult } from "./diario-list.query.result";

export const DiarioListQueryMetadata = createOperationMetadata({
  operationId: "diarioFindAll",
  summary: "Lista diarios",
});

export const IDiarioListQueryHandler = Symbol("IDiarioListQueryHandler");

export type IDiarioListQueryHandler = IQueryHandler<DiarioListQuery | null, DiarioListQueryResult>;
