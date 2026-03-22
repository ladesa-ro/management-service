import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";
import type { CursoFindOneQueryResult } from "./curso-find-one.query.result";

export const CursoFindOneQueryMetadata = createOperationMetadata({
  operationId: "cursoFindById",
  summary: "Busca um curso por ID",
});

export const ICursoFindOneQueryHandler = Symbol("ICursoFindOneQueryHandler");

export type ICursoFindOneQueryHandler = IQueryHandler<
  CursoFindOneQuery,
  CursoFindOneQueryResult | null
>;
