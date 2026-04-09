import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioListQuery } from "./diario-list.query";
import type { DiarioListQueryResult } from "./diario-list.query.result";

export const DiarioListQueryMetadata = createOperationMetadata({
  operationId: "diarioFindAll",
  summary: "Lista diarios",
});

export const IDiarioListQueryHandler = Symbol("IDiarioListQueryHandler");

export type IDiarioListQueryHandler = IQueryHandler<DiarioListQuery | null, DiarioListQueryResult>;

export const diarioPaginationSpec: IPaginationSpec = {
  sortableColumns: ["ativo", "disciplina.nome", "ambientePadrao.nome"],
  searchableColumns: ["id", "ativo", "ano", "etapa", "turma.periodo", "disciplina.nome"],
  defaultSortBy: [],
  filterableColumns: {
    "turma.id": [PaginationFilter.EQ],
    "turma.curso.campus.id": [PaginationFilter.EQ],
    "disciplina.id": [PaginationFilter.EQ],
    "ambientePadrao.id": [PaginationFilter.EQ],
  },
};
