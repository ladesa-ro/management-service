import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoListQuery } from "./curso-list.query";
import type { CursoListQueryResult } from "./curso-list.query.result";
export type ICursoListQuery = {
  accessContext: AccessContext;
  dto: CursoListQuery | null;
  selection?: string[] | boolean;
};

export type ICursoListQueryHandler = IQueryHandler<ICursoListQuery, CursoListQueryResult>;
export const ICursoListQueryHandler = Symbol("ICursoListQueryHandler");
