import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class DiarioPreferenciaAgrupamentoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
}
