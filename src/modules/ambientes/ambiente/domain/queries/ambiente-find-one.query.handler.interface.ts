import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";
import type { AmbienteFindOneQueryResult } from "./ambiente-find-one.query.result";

export const AmbienteFindOneQueryMetadata = createOperationMetadata({
  operationId: "ambienteFindById",
  summary: "Busca um ambiente por ID",
});

export const IAmbienteFindOneQueryHandler = Symbol("IAmbienteFindOneQueryHandler");

export type IAmbienteFindOneQueryHandler = IQueryHandler<
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult | null
>;
