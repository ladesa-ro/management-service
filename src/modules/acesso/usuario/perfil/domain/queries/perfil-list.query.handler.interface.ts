import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import type { PerfilListQuery } from "./perfil-list.query";
import type { PerfilListQueryResult } from "./perfil-list.query.result";

export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");

export type IPerfilListQueryHandler = IQueryHandler<PerfilListQuery | null, PerfilListQueryResult>;

export const perfilPaginationSpec: IPaginationSpec = {
  sortableColumns: ["id"],
  searchableColumns: ["cargo.nome"],
  defaultSortBy: [],
  filterableColumns: {
    ativo: [PaginationFilter.EQ],
    "cargo.nome": [PaginationFilter.EQ],
    "campus.id": [PaginationFilter.EQ],
    "usuario.id": [PaginationFilter.EQ],
  },
};
