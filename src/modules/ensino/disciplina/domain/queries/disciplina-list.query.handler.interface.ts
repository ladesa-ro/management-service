import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaListQuery } from "./disciplina-list.query";
import type { DisciplinaListQueryResult } from "./disciplina-list.query.result";
export type IDisciplinaListQuery = {
  accessContext: AccessContext;
  dto: DisciplinaListQuery | null;
  selection?: string[] | boolean;
};

export type IDisciplinaListQueryHandler = IQueryHandler<
  IDisciplinaListQuery,
  DisciplinaListQueryResult
>;
export const IDisciplinaListQueryHandler = Symbol("IDisciplinaListQueryHandler");
