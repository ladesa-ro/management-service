import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery } from "./diario-professor-find-one.query";
import type { DiarioProfessorFindOneQueryResult } from "./diario-professor-find-one.query.result";

export type IDiarioProfessorFindOneQueryHandler = IQueryHandler<
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult | null
>;
export const IDiarioProfessorFindOneQueryHandler = Symbol("IDiarioProfessorFindOneQueryHandler");
