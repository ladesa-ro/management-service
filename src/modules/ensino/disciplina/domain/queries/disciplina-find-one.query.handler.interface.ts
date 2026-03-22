import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";
import type { DisciplinaFindOneQueryResult } from "./disciplina-find-one.query.result";

export const DisciplinaFindOneQueryMetadata = createOperationMetadata({
  operationId: "disciplinaFindById",
  summary: "Busca uma disciplina por ID",
});

export const IDisciplinaFindOneQueryHandler = Symbol("IDisciplinaFindOneQueryHandler");

export type IDisciplinaFindOneQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult | null
>;
