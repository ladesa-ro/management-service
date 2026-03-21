import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaListQuery } from "./turma-list.query";
import type { TurmaListQueryResult } from "./turma-list.query.result";

export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");

export type ITurmaListQueryHandler = IQueryHandler<TurmaListQuery | null, TurmaListQueryResult>;
