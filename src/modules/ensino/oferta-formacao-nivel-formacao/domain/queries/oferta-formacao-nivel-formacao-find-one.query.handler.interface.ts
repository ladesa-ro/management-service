import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "./oferta-formacao-nivel-formacao-find-one.query";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "./oferta-formacao-nivel-formacao-find-one.query.result";

export type IOfertaFormacaoNivelFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult | null
>;
export const IOfertaFormacaoNivelFormacaoFindOneQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoFindOneQueryHandler",
);
