import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class CampusListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
