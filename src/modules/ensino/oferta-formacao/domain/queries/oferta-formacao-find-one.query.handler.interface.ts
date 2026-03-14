import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "./oferta-formacao-find-one.query";
import type { OfertaFormacaoFindOneQueryResult } from "./oferta-formacao-find-one.query.result";
export type IOfertaFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: OfertaFormacaoFindOneQuery;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  IOfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult | null
>;
export const IOfertaFormacaoFindOneQueryHandler = Symbol("IOfertaFormacaoFindOneQueryHandler");
