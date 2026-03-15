import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";
import type { DisciplinaFindOneQueryResult } from "./disciplina-find-one.query.result";

export type IDisciplinaFindOneQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult | null
>;
export const IDisciplinaFindOneQueryHandler = Symbol("IDisciplinaFindOneQueryHandler");
