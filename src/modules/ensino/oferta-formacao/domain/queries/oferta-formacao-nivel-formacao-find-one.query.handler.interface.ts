import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "./oferta-formacao-nivel-formacao-find-one.query";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "./oferta-formacao-nivel-formacao-find-one.query.result";

export const OfertaFormacaoNivelFormacaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoNivelFormacaoFindById",
  summary: "Busca um nivel de formacao de uma oferta de formacao por ID",
});

export const IOfertaFormacaoNivelFormacaoFindOneQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoFindOneQueryHandler",
);

export type IOfertaFormacaoNivelFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult | null
>;
