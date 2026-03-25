import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class PerfilListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ativo"?: IFilterAcceptableValues;
  "filter.cargo"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}
