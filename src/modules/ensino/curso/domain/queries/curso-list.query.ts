import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class CursoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}
