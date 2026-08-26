import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoFindOneQueryResult } from "../queries/empresa-avaliacao-find-one.query.result";

export interface EmpresaAvaliacaoCreateCommand {
  empresaId: string;
  rating: number;
  comentario?: string | null;
}

export const EmpresaAvaliacaoCreateCommandMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoCreate",
  summary: "Cria uma nova avaliação para uma empresa pelo estagiário autenticado",
});

export const IEmpresaAvaliacaoCreateCommandHandler = Symbol(
  "IEmpresaAvaliacaoCreateCommandHandler",
);

export type IEmpresaAvaliacaoCreateCommandHandler = ICommandHandler<
  EmpresaAvaliacaoCreateCommand,
  EmpresaAvaliacaoFindOneQueryResult
>;
