import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoListQuery } from "./oferta-formacao-list.query";
import type { OfertaFormacaoListQueryResult } from "./oferta-formacao-list.query.result";
export type IOfertaFormacaoListQuery = {
  accessContext: AccessContext;
  dto: OfertaFormacaoListQuery | null;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoListQueryHandler = IQueryHandler<
  IOfertaFormacaoListQuery,
  OfertaFormacaoListQueryResult
>;
export const IOfertaFormacaoListQueryHandler = Symbol("IOfertaFormacaoListQueryHandler");
