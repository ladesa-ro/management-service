import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoFindOneQueryResult } from "./empresa-avaliacao-find-one.query.result";

export interface EmpresaAvaliacaoFindOneQuery {
  id: string;
}

export const EmpresaAvaliacaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoFindById",
  summary: "Busca uma avaliação de empresa por ID",
});

export const IEmpresaAvaliacaoFindOneQueryHandler = Symbol("IEmpresaAvaliacaoFindOneQueryHandler");

export type IEmpresaAvaliacaoFindOneQueryHandler = IQueryHandler<
  EmpresaAvaliacaoFindOneQuery,
  EmpresaAvaliacaoFindOneQueryResult | null
>;
