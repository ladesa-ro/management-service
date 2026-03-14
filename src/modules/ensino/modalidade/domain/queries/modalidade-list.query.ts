import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class ModalidadeListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
}
