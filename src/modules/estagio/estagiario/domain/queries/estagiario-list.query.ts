import { PaginationQuery } from "@/domain/abstractions/queries/pagination.query";

export class EstagiarioListQuery extends PaginationQuery {
  filterIdPerfilFk?: string[];
  filterIdCursoFk?: string[];
  filterIdTurmaFk?: string[];
}
