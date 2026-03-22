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
