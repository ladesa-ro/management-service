import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { MinhasCandidaturasListQuery } from "./minhas-candidaturas-list.query";
import type { MinhasCandidaturasListQueryResult } from "./minhas-candidaturas-list.query.result";

export const MinhasCandidaturasListQueryMetadata = createOperationMetadata({
  operationId: "estagioMinhasCandidaturasFindAll",
  summary: "Lista as candidaturas do aluno autenticado",
  description:
    "Retorna o histórico e fila de candidaturas do aluno autenticado com posição dinâmica na fila.",
});

export const IMinhasCandidaturasListQueryHandler = Symbol("IMinhasCandidaturasListQueryHandler");

export type IMinhasCandidaturasListQueryHandler = IQueryHandler<
  MinhasCandidaturasListQuery | null,
  MinhasCandidaturasListQueryResult
>;
