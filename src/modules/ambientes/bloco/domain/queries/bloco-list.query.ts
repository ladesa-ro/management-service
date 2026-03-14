import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class BlocoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
}
