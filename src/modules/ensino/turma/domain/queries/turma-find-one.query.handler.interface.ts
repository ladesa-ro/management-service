import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";
import type { TurmaFindOneQueryResult } from "./turma-find-one.query.result";

export const TurmaFindOneQueryMetadata = createOperationMetadata({
  operationId: "turmaFindById",
  summary: "Busca uma turma por ID",
});

export const ITurmaFindOneQueryHandler = Symbol("ITurmaFindOneQueryHandler");

export type ITurmaFindOneQueryHandler = IQueryHandler<
  TurmaFindOneQuery,
  TurmaFindOneQueryResult | null
>;
