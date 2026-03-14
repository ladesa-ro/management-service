import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class DiaCalendarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}
