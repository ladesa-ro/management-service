import type { IQueryHandler } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "./oferta-formacao-find-one.query";
import type { OfertaFormacaoFindOneQueryResult } from "./oferta-formacao-find-one.query.result";

export const IOfertaFormacaoFindOneQueryHandler = Symbol("IOfertaFormacaoFindOneQueryHandler");

export type IOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult | null
>;
