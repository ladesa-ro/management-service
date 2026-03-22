import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "./nivel-formacao-find-one.query";
import type { NivelFormacaoFindOneQueryResult } from "./nivel-formacao-find-one.query.result";

export const NivelFormacaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "nivelFormacaoFindById",
  summary: "Busca um nivel de formacao por ID",
});

export const INivelFormacaoFindOneQueryHandler = Symbol("INivelFormacaoFindOneQueryHandler");

export type INivelFormacaoFindOneQueryHandler = IQueryHandler<
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult | null
>;
