import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaListQuery } from "./turma-list.query";
import type { TurmaListQueryResult } from "./turma-list.query.result";
export type ITurmaListQuery = {
  accessContext: AccessContext;
  dto: TurmaListQuery | null;
  selection?: string[] | boolean;
};

export type ITurmaListQueryHandler = IQueryHandler<ITurmaListQuery, TurmaListQueryResult>;
export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");
