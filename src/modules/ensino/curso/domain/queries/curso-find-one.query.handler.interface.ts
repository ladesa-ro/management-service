import type { IQueryHandler } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";
import type { CursoFindOneQueryResult } from "./curso-find-one.query.result";

export const ICursoFindOneQueryHandler = Symbol("ICursoFindOneQueryHandler");

export type ICursoFindOneQueryHandler = IQueryHandler<
  CursoFindOneQuery,
  CursoFindOneQueryResult | null
>;
