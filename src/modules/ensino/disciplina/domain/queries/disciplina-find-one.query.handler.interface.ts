import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";
import type { DisciplinaFindOneQueryResult } from "./disciplina-find-one.query.result";
export type IDisciplinaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DisciplinaFindOneQuery;
  selection?: string[] | boolean;
};

export type IDisciplinaFindOneQueryHandler = IQueryHandler<
  IDisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult | null
>;
export const IDisciplinaFindOneQueryHandler = Symbol("IDisciplinaFindOneQueryHandler");
