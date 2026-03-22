import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoListQuery } from "./nivel-formacao-list.query";
import type { NivelFormacaoListQueryResult } from "./nivel-formacao-list.query.result";

export const NivelFormacaoListQueryMetadata = createOperationMetadata({
  operationId: "nivelFormacaoFindAll",
  summary: "Lista niveis de formacao",
});

export const INivelFormacaoListQueryHandler = Symbol("INivelFormacaoListQueryHandler");

export type INivelFormacaoListQueryHandler = IQueryHandler<
  NivelFormacaoListQuery | null,
  NivelFormacaoListQueryResult
>;
