import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery, DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaUpdateCommand } from "./disciplina-update.command";

export const DisciplinaUpdateCommandMetadata = createOperationMetadata({
  operationId: "disciplinaUpdate",
  summary: "Atualiza uma disciplina",
});

export const IDisciplinaUpdateCommandHandler = Symbol("IDisciplinaUpdateCommandHandler");

export type IDisciplinaUpdateCommandHandler = ICommandHandler<
  DisciplinaFindOneQuery & DisciplinaUpdateCommand,
  DisciplinaFindOneQueryResult
>;
