import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoListQuery } from "./oferta-formacao-nivel-formacao-list.query";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "./oferta-formacao-nivel-formacao-list.query.result";

export const OfertaFormacaoNivelFormacaoListQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoNivelFormacaoFindAll",
  summary: "Lista niveis de formacao de uma oferta de formacao",
});

export const IOfertaFormacaoNivelFormacaoListQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoListQueryHandler",
);

export type IOfertaFormacaoNivelFormacaoListQueryHandler = IQueryHandler<
  OfertaFormacaoNivelFormacaoListQuery | null,
  OfertaFormacaoNivelFormacaoListQueryResult
>;
