import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class DiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.disciplina.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
}
