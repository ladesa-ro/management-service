import type { IQueryHandler } from "@/domain/abstractions";
import type { CursoListQuery } from "./curso-list.query";
import type { CursoListQueryResult } from "./curso-list.query.result";

export const ICursoListQueryHandler = Symbol("ICursoListQueryHandler");

export type ICursoListQueryHandler = IQueryHandler<CursoListQuery | null, CursoListQueryResult>;
