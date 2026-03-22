import type { IQueryHandler } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";
import type { TurmaFindOneQueryResult } from "./turma-find-one.query.result";

export const ITurmaFindOneQueryHandler = Symbol("ITurmaFindOneQueryHandler");

export type ITurmaFindOneQueryHandler = IQueryHandler<
  TurmaFindOneQuery,
  TurmaFindOneQueryResult | null
>;
