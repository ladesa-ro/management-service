import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EmpresaListQuery } from "./empresa-list.query";
import type { EmpresaListQueryResult } from "./empresa-list.query.result";

export const EmpresaListQueryMetadata = createOperationMetadata({
  operationId: "empresaFindAll",
  summary: "Lista empresas",
});

export const IEmpresaListQueryHandler = Symbol("IEmpresaListQueryHandler");

export type IEmpresaListQueryHandler = IQueryHandler<
  EmpresaListQuery | null,
  EmpresaListQueryResult
>;

export const empresaPaginationSpec: IPaginationSpec = {
  sortableColumns: ["razaoSocial", "nomeFantasia", "cnpj", "dateCreated"],
  searchableColumns: ["razaoSocial", "nomeFantasia", "cnpj", "email"],
  defaultSortBy: [["nomeFantasia", "ASC"]],
  filterableColumns: {
    "endereco.id": [PaginationFilter.EQ],
    cnpj: [PaginationFilter.EQ],
    nomeFantasia: [PaginationFilter.EQ],
  },
};
