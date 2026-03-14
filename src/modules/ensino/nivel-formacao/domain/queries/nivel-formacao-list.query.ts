import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class NivelFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
