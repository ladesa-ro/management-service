import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioFindOneQuery } from "./estagio-find-one.query";
import type { EstagioFindOneQueryResult } from "./estagio-find-one.query.result";

export const EstagioFindOneQueryMetadata = createOperationMetadata({
  operationId: "estagioFindById",
  summary: "Busca um estágio por ID",
});

export const IEstagioFindOneQueryHandler = Symbol("IEstagioFindOneQueryHandler");

export type IEstagioFindOneQueryHandler = IQueryHandler<
  EstagioFindOneQuery,
  EstagioFindOneQueryResult | null
>;
