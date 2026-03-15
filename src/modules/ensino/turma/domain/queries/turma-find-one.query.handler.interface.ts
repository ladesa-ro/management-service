import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";
import type { TurmaFindOneQueryResult } from "./turma-find-one.query.result";

export type ITurmaFindOneQueryHandler = IQueryHandler<
  TurmaFindOneQuery,
  TurmaFindOneQueryResult | null
>;
export const ITurmaFindOneQueryHandler = Symbol("ITurmaFindOneQueryHandler");
