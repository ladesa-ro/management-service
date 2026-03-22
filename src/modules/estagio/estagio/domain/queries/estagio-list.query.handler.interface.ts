import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioListQuery } from "./estagio-list.query";
import type { EstagioListQueryResult } from "./estagio-list.query.result";

export const EstagioListQueryMetadata = createOperationMetadata({
  operationId: "estagioFindAll",
  summary: "Lista estágios",
});

export const IEstagioListQueryHandler = Symbol("IEstagioListQueryHandler");

export type IEstagioListQueryHandler = IQueryHandler<
  EstagioListQuery | null,
  EstagioListQueryResult
>;
