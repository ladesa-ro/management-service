import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery } from "./diario-professor-find-one.query";
import type { DiarioProfessorFindOneQueryResult } from "./diario-professor-find-one.query.result";

export const IDiarioProfessorFindOneQueryHandler = Symbol("IDiarioProfessorFindOneQueryHandler");

export type IDiarioProfessorFindOneQueryHandler = IQueryHandler<
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult | null
>;
