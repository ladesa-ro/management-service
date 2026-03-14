import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";
import type { TurmaFindOneQueryResult } from "./turma-find-one.query.result";
export type ITurmaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: TurmaFindOneQuery;
  selection?: string[] | boolean;
};

export type ITurmaFindOneQueryHandler = IQueryHandler<
  ITurmaFindOneQuery,
  TurmaFindOneQueryResult | null
>;
export const ITurmaFindOneQueryHandler = Symbol("ITurmaFindOneQueryHandler");
