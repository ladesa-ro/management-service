import type { IQueryHandler } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";
import type { DisciplinaFindOneQueryResult } from "./disciplina-find-one.query.result";

export const IDisciplinaFindOneQueryHandler = Symbol("IDisciplinaFindOneQueryHandler");

export type IDisciplinaFindOneQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult | null
>;
