import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioListQuery } from "./usuario-list.query";
import type { UsuarioListQueryResult } from "./usuario-list.query.result";

export const UsuarioListQueryMetadata = createOperationMetadata({
  operationId: "usuarioFindAll",
  summary: "Lista usuarios",
});

export const IUsuarioListQueryHandler = Symbol("IUsuarioListQueryHandler");

export type IUsuarioListQueryHandler = IQueryHandler<
  UsuarioListQuery | null,
  UsuarioListQueryResult
>;

export const usuarioPaginationSpec: IPaginationSpec = {
  sortableColumns: ["nome", "matricula", "email", "dateCreated"],
  searchableColumns: ["id", "nome", "matricula", "email"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
    ["matricula", "ASC"],
  ],
  filterableColumns: {
    "vinculos.cargo.nome": [PaginationFilter.EQ],
  },
};
