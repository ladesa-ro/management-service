import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "./oferta-formacao-find-one.query";
import type { OfertaFormacaoFindOneQueryResult } from "./oferta-formacao-find-one.query.result";

export type IOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult | null
>;
export const IOfertaFormacaoFindOneQueryHandler = Symbol("IOfertaFormacaoFindOneQueryHandler");
