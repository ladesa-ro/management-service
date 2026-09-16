import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliavelQueryResult } from "./empresa-avaliavel-list.query.result";

export interface EmpresaAvaliavelListQuery {}

export const EmpresaAvaliavelListQueryMetadata = createOperationMetadata({
  operationId: "empresaAvaliavelList",
  summary: "Lista empresas onde o estagiário autenticado realizou estágio elegível para avaliação",
});

export const IEmpresaAvaliavelListQueryHandler = Symbol("IEmpresaAvaliavelListQueryHandler");

export type IEmpresaAvaliavelListQueryHandler = IQueryHandler<
  EmpresaAvaliavelListQuery,
  EmpresaAvaliavelQueryResult[]
>;
