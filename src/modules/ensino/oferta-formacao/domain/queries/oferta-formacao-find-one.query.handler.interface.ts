import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "./oferta-formacao-find-one.query";
import type { OfertaFormacaoFindOneQueryResult } from "./oferta-formacao-find-one.query.result";

export const OfertaFormacaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoFindById",
  summary: "Busca uma oferta de formacao por ID",
});

export const IOfertaFormacaoFindOneQueryHandler = Symbol("IOfertaFormacaoFindOneQueryHandler");

export type IOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult | null
>;
