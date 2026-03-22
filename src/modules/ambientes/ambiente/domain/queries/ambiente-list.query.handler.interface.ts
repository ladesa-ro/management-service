import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteListQuery } from "./ambiente-list.query";
import type { AmbienteListQueryResult } from "./ambiente-list.query.result";

export const AmbienteListQueryMetadata = createOperationMetadata({
  operationId: "ambienteFindAll",
  summary: "Lista ambientes",
});

export const IAmbienteListQueryHandler = Symbol("IAmbienteListQueryHandler");

export type IAmbienteListQueryHandler = IQueryHandler<
  AmbienteListQuery | null,
  AmbienteListQueryResult
>;
