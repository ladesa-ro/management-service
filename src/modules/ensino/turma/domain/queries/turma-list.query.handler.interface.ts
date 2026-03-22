import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaListQuery } from "./turma-list.query";
import type { TurmaListQueryResult } from "./turma-list.query.result";

export const TurmaListQueryMetadata = createOperationMetadata({
  operationId: "turmaFindAll",
  summary: "Lista turmas",
});

export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");

export type ITurmaListQueryHandler = IQueryHandler<TurmaListQuery | null, TurmaListQueryResult>;
