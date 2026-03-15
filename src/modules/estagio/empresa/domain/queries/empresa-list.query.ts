import { PaginationQuery } from "@/domain/abstractions/queries/pagination-query";

export class EmpresaListQuery extends PaginationQuery {
  filterCnpj?: string[];
  filterNomeFantasia?: string[];
  filterIdEnderecoFk?: string[];
}
