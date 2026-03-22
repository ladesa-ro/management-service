import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaListQuery } from "./disciplina-list.query";
import type { DisciplinaListQueryResult } from "./disciplina-list.query.result";

export const DisciplinaListQueryMetadata = createOperationMetadata({
  operationId: "disciplinaFindAll",
  summary: "Lista disciplinas",
});

export const IDisciplinaListQueryHandler = Symbol("IDisciplinaListQueryHandler");

export type IDisciplinaListQueryHandler = IQueryHandler<
  DisciplinaListQuery | null,
  DisciplinaListQueryResult
>;
