import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class EstadoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
