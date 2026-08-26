import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoFindOneQueryResult } from "./empresa-avaliacao-find-one.query.result";

export interface EmpresaAvaliacaoFindMyQuery {
  empresaId: string;
}

export const EmpresaAvaliacaoFindMyQueryMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoFindMy",
  summary: "Busca a avaliação do usuário autenticado para uma determinada empresa",
});

export const IEmpresaAvaliacaoFindMyQueryHandler = Symbol("IEmpresaAvaliacaoFindMyQueryHandler");

export type IEmpresaAvaliacaoFindMyQueryHandler = IQueryHandler<
  EmpresaAvaliacaoFindMyQuery,
  EmpresaAvaliacaoFindOneQueryResult | null
>;
