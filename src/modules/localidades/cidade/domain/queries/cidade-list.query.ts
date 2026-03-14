import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class CidadeListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estado.id"?: IFilterAcceptableValues;
  "filter.estado.nome"?: IFilterAcceptableValues;
  "filter.estado.sigla"?: IFilterAcceptableValues;
}
