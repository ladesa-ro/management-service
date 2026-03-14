import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "./oferta-formacao-nivel-formacao-find-one.query";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "./oferta-formacao-nivel-formacao-find-one.query.result";
export type IOfertaFormacaoNivelFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: OfertaFormacaoNivelFormacaoFindOneQuery;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoNivelFormacaoFindOneQueryHandler = IQueryHandler<
  IOfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult | null
>;
export const IOfertaFormacaoNivelFormacaoFindOneQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoFindOneQueryHandler",
);
