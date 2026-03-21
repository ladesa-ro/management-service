import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorListQuery } from "./diario-professor-list.query";
import type { DiarioProfessorListQueryResult } from "./diario-professor-list.query.result";

export const IDiarioProfessorListQueryHandler = Symbol("IDiarioProfessorListQueryHandler");

export type IDiarioProfessorListQueryHandler = IQueryHandler<
  DiarioProfessorListQuery | null,
  DiarioProfessorListQueryResult
>;
