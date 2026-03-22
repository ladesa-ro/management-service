import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CidadeFindOneQuery } from "./cidade-find-one.query";
import type { CidadeFindOneQueryResult } from "./cidade-find-one.query.result";

export const CidadeFindOneQueryMetadata = createOperationMetadata({
  operationId: "cidadeFindById",
  summary: "Busca uma cidade por ID",
});

export const ICidadeFindOneQueryHandler = Symbol("ICidadeFindOneQueryHandler");

export type ICidadeFindOneQueryHandler = IQueryHandler<
  CidadeFindOneQuery,
  CidadeFindOneQueryResult | null
>;
