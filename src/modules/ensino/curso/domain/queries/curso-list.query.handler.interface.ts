import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoListQuery } from "./curso-list.query";
import type { CursoListQueryResult } from "./curso-list.query.result";

export const CursoListQueryMetadata = createOperationMetadata({
  operationId: "cursoFindAll",
  summary: "Lista cursos",
});

export const ICursoListQueryHandler = Symbol("ICursoListQueryHandler");

export type ICursoListQueryHandler = IQueryHandler<CursoListQuery | null, CursoListQueryResult>;
