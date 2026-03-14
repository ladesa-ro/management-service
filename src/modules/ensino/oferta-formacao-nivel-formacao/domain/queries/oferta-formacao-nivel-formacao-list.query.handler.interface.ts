import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoListQuery } from "./oferta-formacao-nivel-formacao-list.query";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "./oferta-formacao-nivel-formacao-list.query.result";
export type IOfertaFormacaoNivelFormacaoListQuery = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoListQuery | null;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoNivelFormacaoListQueryHandler = IQueryHandler<
  IOfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoListQueryResult
>;
export const IOfertaFormacaoNivelFormacaoListQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoListQueryHandler",
);
