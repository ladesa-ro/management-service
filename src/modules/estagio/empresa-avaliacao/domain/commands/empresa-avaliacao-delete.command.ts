import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";

export interface EmpresaAvaliacaoDeleteCommand {
  id: string;
}

export const EmpresaAvaliacaoDeleteCommandMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoDelete",
  summary: "Inativa/remove uma avaliação de empresa pelo próprio autor ou superusuário",
});

export const IEmpresaAvaliacaoDeleteCommandHandler = Symbol(
  "IEmpresaAvaliacaoDeleteCommandHandler",
);

export type IEmpresaAvaliacaoDeleteCommandHandler = ICommandHandler<
  EmpresaAvaliacaoDeleteCommand,
  boolean
>;
