import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoFindOneQueryResult } from "../queries/empresa-avaliacao-find-one.query.result";

export interface EmpresaAvaliacaoUpdateCommand {
  id: string;
  rating?: number;
  comentario?: string | null;
}

export const EmpresaAvaliacaoUpdateCommandMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoUpdate",
  summary: "Atualiza uma avaliação existente pelo próprio autor",
});

export const IEmpresaAvaliacaoUpdateCommandHandler = Symbol(
  "IEmpresaAvaliacaoUpdateCommandHandler",
);

export type IEmpresaAvaliacaoUpdateCommandHandler = ICommandHandler<
  EmpresaAvaliacaoUpdateCommand,
  EmpresaAvaliacaoFindOneQueryResult
>;
