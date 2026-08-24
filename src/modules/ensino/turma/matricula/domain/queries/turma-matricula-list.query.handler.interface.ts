import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaMatriculaListQuery } from "./turma-matricula-list.query";
import type { TurmaMatriculaListQueryResult } from "./turma-matricula-list.query.result";

export const TurmaMatriculaListQueryMetadata = createOperationMetadata({
  operationId: "turmaMatriculaFindAll",
  summary: "Lista matriculas — por turma (alunos da turma) ou por perfil (turmas do aluno)",
});

export const ITurmaMatriculaListQueryHandler = Symbol("ITurmaMatriculaListQueryHandler");

export type ITurmaMatriculaListQueryHandler = IQueryHandler<
  TurmaMatriculaListQuery | null,
  TurmaMatriculaListQueryResult
>;

export const turmaMatriculaPaginationSpec: IPaginationSpec = {
  sortableColumns: ["dateCreated"],
  searchableColumns: ["id"],
  defaultSortBy: [],
  filterableColumns: {
    "turma.id": [PaginationFilter.EQ],
    "perfil.id": [PaginationFilter.EQ],
  },
};
