import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaMatriculaFindOneQueryResult } from "../queries/turma-matricula-find-one.query.result";
import type { TurmaMatriculaVincularCommand } from "./turma-matricula-vincular.command";

export const TurmaMatriculaVincularCommandMetadata = createOperationMetadata({
  operationId: "turmaMatriculaVincular",
  summary: "Matricula um perfil (aluno) em uma turma",
});

export const ITurmaMatriculaVincularCommandHandler = Symbol(
  "ITurmaMatriculaVincularCommandHandler",
);

export type ITurmaMatriculaVincularCommandHandler = ICommandHandler<
  TurmaMatriculaVincularCommand,
  TurmaMatriculaFindOneQueryResult
>;
