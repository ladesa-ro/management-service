import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorListQuery } from "./diario-professor-list.query";
import type { DiarioProfessorListQueryResult } from "./diario-professor-list.query.result";
export type IDiarioProfessorListQuery = {
  accessContext: AccessContext;
  dto: DiarioProfessorListQuery | null;
  selection?: string[] | boolean;
};

export type IDiarioProfessorListQueryHandler = IQueryHandler<
  IDiarioProfessorListQuery,
  DiarioProfessorListQueryResult
>;
export const IDiarioProfessorListQueryHandler = Symbol("IDiarioProfessorListQueryHandler");
