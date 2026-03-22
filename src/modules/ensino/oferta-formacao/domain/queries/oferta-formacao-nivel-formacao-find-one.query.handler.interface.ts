import type { IQueryHandler } from "@/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "./oferta-formacao-nivel-formacao-find-one.query";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "./oferta-formacao-nivel-formacao-find-one.query.result";

export const IOfertaFormacaoNivelFormacaoFindOneQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoFindOneQueryHandler",
);

export type IOfertaFormacaoNivelFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult | null
>;
