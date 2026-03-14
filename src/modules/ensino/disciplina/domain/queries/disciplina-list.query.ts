import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class DisciplinaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
