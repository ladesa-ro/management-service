import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagiarioListQuery } from "./estagiario-list.query";
import type { EstagiarioListQueryResult } from "./estagiario-list.query.result";

export const EstagiarioListQueryMetadata = createOperationMetadata({
  operationId: "estagiarioFindAll",
  summary: "Lista estagiários",
});

export const IEstagiarioListQueryHandler = Symbol("IEstagiarioListQueryHandler");

export type IEstagiarioListQueryHandler = IQueryHandler<
  EstagiarioListQuery | null,
  EstagiarioListQueryResult
>;

export const estagiarioPaginationSpec: IPaginationSpec = {
  sortableColumns: ["telefone", "dataNascimento", "dateCreated"],
  searchableColumns: ["telefone", "emailInstitucional", "periodo"],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    "perfil.id": [PaginationFilter.EQ],
    "curso.id": [PaginationFilter.EQ],
    periodo: [PaginationFilter.EQ],
  },
};
