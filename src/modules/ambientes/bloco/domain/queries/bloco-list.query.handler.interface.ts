import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { BlocoListQuery } from "./bloco-list.query";
import type { BlocoListQueryResult } from "./bloco-list.query.result";

export const BlocoListQueryMetadata = createOperationMetadata({
  operationId: "blocoFindAll",
  summary: "Lista blocos",
});

export const IBlocoListQueryHandler = Symbol("IBlocoListQueryHandler");

export type IBlocoListQueryHandler = IQueryHandler<BlocoListQuery | null, BlocoListQueryResult>;

export const blocoPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "nome",
    "codigo",
    "dateCreated",
    "campus.id",
    "campus.razaoSocial",
    "campus.nomeFantasia",
  ],
  searchableColumns: ["id", "nome", "codigo"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "campus.id": [PaginationFilter.EQ],
  },
};
