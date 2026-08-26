import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";
import type { EmpresaAvaliacaoLikeResult } from "./empresa-avaliacao-like.command";

export interface EmpresaAvaliacaoUnlikeCommand {
  avaliacaoId: string;
}

export const EmpresaAvaliacaoUnlikeCommandMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoUnlike",
  summary: "Remove uma curtida previamente registrada em uma avaliação",
});

export const IEmpresaAvaliacaoUnlikeCommandHandler = Symbol(
  "IEmpresaAvaliacaoUnlikeCommandHandler",
);

export type IEmpresaAvaliacaoUnlikeCommandHandler = ICommandHandler<
  EmpresaAvaliacaoUnlikeCommand,
  EmpresaAvaliacaoLikeResult
>;
