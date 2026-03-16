import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class UsuarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.vinculos.cargo"?: IFilterAcceptableValues;
}
