import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class ImagemListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
