import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "../queries";

export const TurmaDeleteCommandMetadata = createOperationMetadata({
  operationId: "turmaDeleteOneById",
  summary: "Remove uma turma",
});

export const ITurmaDeleteCommandHandler = Symbol("ITurmaDeleteCommandHandler");

export type ITurmaDeleteCommandHandler = ICommandHandler<TurmaFindOneQuery, boolean>;
