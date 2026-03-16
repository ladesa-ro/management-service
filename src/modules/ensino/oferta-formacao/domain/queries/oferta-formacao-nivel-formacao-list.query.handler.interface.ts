import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoListQuery } from "./oferta-formacao-nivel-formacao-list.query";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "./oferta-formacao-nivel-formacao-list.query.result";

export type IOfertaFormacaoNivelFormacaoListQueryHandler = IQueryHandler<
  OfertaFormacaoNivelFormacaoListQuery | null,
  OfertaFormacaoNivelFormacaoListQueryResult
>;
export const IOfertaFormacaoNivelFormacaoListQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoListQueryHandler",
);
