import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class CalendarioLetivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ano"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
