import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";
import type { CursoFindOneQueryResult } from "./curso-find-one.query.result";
export type ICursoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CursoFindOneQuery;
  selection?: string[] | boolean;
};

export type ICursoFindOneQueryHandler = IQueryHandler<
  ICursoFindOneQuery,
  CursoFindOneQueryResult | null
>;
export const ICursoFindOneQueryHandler = Symbol("ICursoFindOneQueryHandler");
