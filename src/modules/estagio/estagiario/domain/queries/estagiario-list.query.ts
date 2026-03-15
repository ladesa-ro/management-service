import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class EstagiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.idPerfilFk"?: IFilterAcceptableValues;
  "filter.idCursoFk"?: IFilterAcceptableValues;
  "filter.idTurmaFk"?: IFilterAcceptableValues;
}
