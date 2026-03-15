import { PaginationQuery } from "@/domain/abstractions/queries/pagination.query";
import { EstagioStatus } from "../estagio";

export class EstagioListQuery extends PaginationQuery {
  filterIdEmpresaFk?: string[];
  filterIdEstagiarioFk?: string[];
  filterStatus?: EstagioStatus[];
}
