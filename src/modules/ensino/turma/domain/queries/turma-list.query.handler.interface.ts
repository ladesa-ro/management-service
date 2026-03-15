import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaListQuery } from "./turma-list.query";
import type { TurmaListQueryResult } from "./turma-list.query.result";

export type ITurmaListQueryHandler = IQueryHandler<TurmaListQuery | null, TurmaListQueryResult>;
export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");
