import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoHistoricoQueryResult } from "./empresa-avaliacao-historico-list.query.result";

export interface EmpresaAvaliacaoHistoricoListQuery {
  avaliacaoId: string;
}

export const EmpresaAvaliacaoHistoricoListQueryMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoHistoricoList",
  summary: "Consulta histórico completo de alterações de uma avaliação",
});

export const IEmpresaAvaliacaoHistoricoListQueryHandler = Symbol(
  "IEmpresaAvaliacaoHistoricoListQueryHandler",
);

export type IEmpresaAvaliacaoHistoricoListQueryHandler = IQueryHandler<
  EmpresaAvaliacaoHistoricoListQuery,
  EmpresaAvaliacaoHistoricoQueryResult[]
>;
