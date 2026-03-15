import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaListQuery } from "./disciplina-list.query";
import type { DisciplinaListQueryResult } from "./disciplina-list.query.result";

export type IDisciplinaListQueryHandler = IQueryHandler<
  DisciplinaListQuery | null,
  DisciplinaListQueryResult
>;
export const IDisciplinaListQueryHandler = Symbol("IDisciplinaListQueryHandler");
