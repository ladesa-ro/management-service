import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class DiarioProfessorListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.id"?: IFilterAcceptableValues;
}
