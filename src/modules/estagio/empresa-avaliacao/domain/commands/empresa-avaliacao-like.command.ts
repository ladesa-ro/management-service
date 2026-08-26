import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions/operations";

export interface EmpresaAvaliacaoLikeCommand {
  avaliacaoId: string;
}

export interface EmpresaAvaliacaoLikeResult {
  avaliacaoId: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  relevanceScore: number;
}

export const EmpresaAvaliacaoLikeCommandMetadata = createOperationMetadata({
  operationId: "empresaAvaliacaoLike",
  summary: "Registra uma curtida em uma avaliação por um usuário autenticado",
});

export const IEmpresaAvaliacaoLikeCommandHandler = Symbol("IEmpresaAvaliacaoLikeCommandHandler");

export type IEmpresaAvaliacaoLikeCommandHandler = ICommandHandler<
  EmpresaAvaliacaoLikeCommand,
  EmpresaAvaliacaoLikeResult
>;
