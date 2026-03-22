import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaFindOneQuery, TurmaFindOneQueryResult } from "../queries";
import type { TurmaUpdateCommand } from "./turma-update.command";

export const TurmaUpdateCommandMetadata = createOperationMetadata({
  operationId: "turmaUpdate",
  summary: "Atualiza uma turma",
});

export const ITurmaUpdateCommandHandler = Symbol("ITurmaUpdateCommandHandler");

export type ITurmaUpdateCommandHandler = ICommandHandler<
  TurmaFindOneQuery & TurmaUpdateCommand,
  TurmaFindOneQueryResult
>;
