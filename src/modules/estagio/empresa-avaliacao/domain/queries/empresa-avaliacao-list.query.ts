import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoListQueryResult } from "./empresa-avaliacao-list.query.result";

export type EmpresaAvaliacaoOrdenacao =
  | "relevancia"
  | "mais_recentes"
  | "mais_curtidos"
  | "melhor_avaliacao"
  | "pior_avaliacao";

export interface EmpresaAvaliacaoListQuery {
  empresaId: string;
  page?: number;
  limit?: number;
  order?: EmpresaAvaliacaoOrdenacao;
  rating?: number;
}

export const EmpresaAvaliacaoListQueryMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoList",
  summary: "Lista avaliações e comentários de uma empresa ordenados por relevância ou filtros",
});

export const IEmpresaAvaliacaoListQueryHandler = Symbol("IEmpresaAvaliacaoListQueryHandler");

export type IEmpresaAvaliacaoListQueryHandler = IQueryHandler<
  EmpresaAvaliacaoListQuery,
  EmpresaAvaliacaoListQueryResult
>;
