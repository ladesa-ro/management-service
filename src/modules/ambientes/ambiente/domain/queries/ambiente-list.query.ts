import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class AmbienteListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.bloco.id"?: IFilterAcceptableValues;
  "filter.bloco.campus.id"?: IFilterAcceptableValues;
}
