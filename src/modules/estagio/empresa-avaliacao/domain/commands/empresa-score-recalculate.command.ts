import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaScoreFindOneQueryResult } from "../queries/empresa-score-find-one.query.result";

export interface EmpresaScoreRecalculateCommand {
  empresaId: string;
}

export const EmpresaScoreRecalculateCommandMetadata = createOperationMetadata({
  operationId: "empresaScoreRecalculate",
  summary: "Recalcula forçadamente o Score e distribuição de uma empresa",
});

export const IEmpresaScoreRecalculateCommandHandler = Symbol(
  "IEmpresaScoreRecalculateCommandHandler",
);

export type IEmpresaScoreRecalculateCommandHandler = ICommandHandler<
  EmpresaScoreRecalculateCommand,
  EmpresaScoreFindOneQueryResult
>;
