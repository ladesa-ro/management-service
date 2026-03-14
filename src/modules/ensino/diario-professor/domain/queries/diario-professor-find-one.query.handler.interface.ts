import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery } from "./diario-professor-find-one.query";
import type { DiarioProfessorFindOneQueryResult } from "./diario-professor-find-one.query.result";
export type IDiarioProfessorFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioProfessorFindOneQuery;
  selection?: string[] | boolean;
};

export type IDiarioProfessorFindOneQueryHandler = IQueryHandler<
  IDiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult | null
>;
export const IDiarioProfessorFindOneQueryHandler = Symbol("IDiarioProfessorFindOneQueryHandler");
