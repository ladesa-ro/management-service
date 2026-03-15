import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoListQuery } from "./oferta-formacao-list.query";
import type { OfertaFormacaoListQueryResult } from "./oferta-formacao-list.query.result";

export type IOfertaFormacaoListQueryHandler = IQueryHandler<
  OfertaFormacaoListQuery | null,
  OfertaFormacaoListQueryResult
>;
export const IOfertaFormacaoListQueryHandler = Symbol("IOfertaFormacaoListQueryHandler");
