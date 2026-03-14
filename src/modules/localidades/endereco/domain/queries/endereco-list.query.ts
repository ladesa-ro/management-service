import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class EnderecoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cidade.id"?: IFilterAcceptableValues;
}
