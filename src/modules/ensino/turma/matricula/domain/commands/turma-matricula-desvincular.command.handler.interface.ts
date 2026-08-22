import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaMatriculaFindOneQuery } from "../queries/turma-matricula-find-one.query";

export const TurmaMatriculaDesvincularCommandMetadata = createOperationMetadata({
  operationId: "turmaMatriculaDesvincularOneById",
  summary: "Desmatricula (soft-delete) um perfil (aluno) de uma turma",
});

export const ITurmaMatriculaDesvincularCommandHandler = Symbol(
  "ITurmaMatriculaDesvincularCommandHandler",
);

export type ITurmaMatriculaDesvincularCommandHandler = ICommandHandler<
  TurmaMatriculaFindOneQuery,
  boolean
>;
