import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";

export const PerfilListQueryMetadata = createOperationMetadata({
  operationId: "perfilFindAll",
  summary: "Lista perfis de um usuario",
});

export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");

export type IPerfilListQueryHandler = IQueryHandler<PerfilListQuery | null, PerfilListQueryResult>;

export const perfilPaginationSpec: IPaginationSpec = {
  sortableColumns: ["id"],
  searchableColumns: ["cargo"],
  defaultSortBy: [],
  filterableColumns: {
    ativo: [PaginationFilter.EQ],
    cargo: [PaginationFilter.EQ],
    "campus.id": [PaginationFilter.EQ],
    "usuario.id": [PaginationFilter.EQ],
  },
};
