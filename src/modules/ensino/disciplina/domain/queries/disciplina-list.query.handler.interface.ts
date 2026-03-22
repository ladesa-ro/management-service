import type { IQueryHandler } from "@/domain/abstractions";
import type { DisciplinaListQuery } from "./disciplina-list.query";
import type { DisciplinaListQueryResult } from "./disciplina-list.query.result";

export const IDisciplinaListQueryHandler = Symbol("IDisciplinaListQueryHandler");

export type IDisciplinaListQueryHandler = IQueryHandler<
  DisciplinaListQuery | null,
  DisciplinaListQueryResult
>;
