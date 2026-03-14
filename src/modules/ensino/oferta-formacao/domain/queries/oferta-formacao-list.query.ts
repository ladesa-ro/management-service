import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class OfertaFormacaoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.modalidade.id"?: IFilterAcceptableValues;
}
