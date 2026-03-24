import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CidadeListQuery } from "./cidade-list.query";
import type { CidadeListQueryResult } from "./cidade-list.query.result";

export const CidadeListQueryMetadata = createOperationMetadata({
  operationId: "cidadeFindAll",
  summary: "Lista cidades",
});

export const ICidadeListQueryHandler = Symbol("ICidadeListQueryHandler");

export type ICidadeListQueryHandler = IQueryHandler<CidadeListQuery | null, CidadeListQueryResult>;

export const cidadePaginationSpec: IPaginationSpec = {
  sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
  searchableColumns: ["nome", "estado.nome", "estado.sigla"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["estado.nome", "ASC"],
  ],
  filterableColumns: {
    "estado.id": [PaginationFilter.EQ],
    "estado.nome": [PaginationFilter.EQ],
    "estado.sigla": [PaginationFilter.EQ],
  },
};
