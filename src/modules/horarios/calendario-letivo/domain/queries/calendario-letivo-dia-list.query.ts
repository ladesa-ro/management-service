import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class CalendarioLetivoDiaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}
