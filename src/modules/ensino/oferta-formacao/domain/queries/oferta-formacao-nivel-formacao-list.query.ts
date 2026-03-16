import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class OfertaFormacaoNivelFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.nivelFormacao.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
