import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteListQuery } from "./ambiente-list.query";
import type { AmbienteListQueryResult } from "./ambiente-list.query.result";

export const AmbienteListQueryMetadata = createOperationMetadata({
  operationId: "ambienteFindAll",
  summary: "Lista ambientes",
});

export const IAmbienteListQueryHandler = Symbol("IAmbienteListQueryHandler");

export type IAmbienteListQueryHandler = IQueryHandler<
  AmbienteListQuery | null,
  AmbienteListQueryResult
>;

export const ambientePaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "nome",
    "descricao",
    "codigo",
    "capacidade",
    "tipo",
    "dateCreated",
    "bloco.id",
    "bloco.campus.id",
  ],
  searchableColumns: ["id", "nome", "descricao", "codigo", "capacidade", "tipo"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "bloco.id": [PaginationFilter.EQ],
    "bloco.campus.id": [PaginationFilter.EQ],
  },
};
