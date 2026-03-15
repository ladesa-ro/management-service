import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";
import type { CursoFindOneQueryResult } from "./curso-find-one.query.result";

export type ICursoFindOneQueryHandler = IQueryHandler<
  CursoFindOneQuery,
  CursoFindOneQueryResult | null
>;
export const ICursoFindOneQueryHandler = Symbol("ICursoFindOneQueryHandler");
