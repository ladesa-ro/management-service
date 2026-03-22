import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaFindOneQueryResult } from "../queries";
import type { TurmaCreateCommand } from "./turma-create.command";

export const TurmaCreateCommandMetadata = createOperationMetadata({
  operationId: "turmaCreate",
  summary: "Cria uma turma",
});

export const ITurmaCreateCommandHandler = Symbol("ITurmaCreateCommandHandler");

export type ITurmaCreateCommandHandler = ICommandHandler<
  TurmaCreateCommand,
  TurmaFindOneQueryResult
>;
