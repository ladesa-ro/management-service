import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaScoreFindOneQueryResult } from "./empresa-score-find-one.query.result";

export interface EmpresaScoreFindOneQuery {
  empresaId: string;
}

export const EmpresaScoreFindOneQueryMetadata = createOperationMetadata({
  operationId: "empresaScoreFindOne",
  summary: "Consulta métricas e Score de Reputação da Empresa (0 a 100)",
});

export const IEmpresaScoreFindOneQueryHandler = Symbol("IEmpresaScoreFindOneQueryHandler");

export type IEmpresaScoreFindOneQueryHandler = IQueryHandler<
  EmpresaScoreFindOneQuery,
  EmpresaScoreFindOneQueryResult
>;
