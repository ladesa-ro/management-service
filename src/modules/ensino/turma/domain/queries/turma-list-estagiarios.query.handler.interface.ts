import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaListEstagiariosQuery } from "./turma-list-estagiarios.query";
import type { TurmaListEstagiariosQueryResult } from "./turma-list-estagiarios.query.result";

export const TurmaListEstagiariosQueryMetadata = createOperationMetadata({
  operationId: "turmaListEstagiarios",
  summary: "Lista os estagiários de uma turma com seus respectivos estágios",
});

export const ITurmaListEstagiariosQueryHandler = Symbol("ITurmaListEstagiariosQueryHandler");

export type ITurmaListEstagiariosQueryHandler = IQueryHandler<
  TurmaListEstagiariosQuery,
  TurmaListEstagiariosQueryResult
>;
