import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class ArquivoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
