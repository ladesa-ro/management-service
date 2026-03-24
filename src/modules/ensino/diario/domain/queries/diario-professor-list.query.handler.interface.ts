import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioProfessorListQuery } from "./diario-professor-list.query";
import type { DiarioProfessorListQueryResult } from "./diario-professor-list.query.result";

export const DiarioProfessorListQueryMetadata = createOperationMetadata({
  operationId: "diarioProfessorFindAll",
  summary: "Lista professores de um diario",
});

export const IDiarioProfessorListQueryHandler = Symbol("IDiarioProfessorListQueryHandler");

export type IDiarioProfessorListQueryHandler = IQueryHandler<
  DiarioProfessorListQuery | null,
  DiarioProfessorListQueryResult
>;

export const diarioProfessorPaginationSpec: IPaginationSpec = {
  sortableColumns: ["situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
  searchableColumns: ["id", "situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
  defaultSortBy: [],
  filterableColumns: {
    "perfil.usuario.id": [PaginationFilter.EQ],
    "perfil.id": [PaginationFilter.EQ],
    "diario.id": [PaginationFilter.EQ],
  },
};
