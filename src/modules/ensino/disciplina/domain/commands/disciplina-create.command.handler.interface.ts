import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaCreateCommand } from "./disciplina-create.command";

export const DisciplinaCreateCommandMetadata = createOperationMetadata({
  operationId: "disciplinaCreate",
  summary: "Cria uma disciplina",
});

export const IDisciplinaCreateCommandHandler = Symbol("IDisciplinaCreateCommandHandler");

export type IDisciplinaCreateCommandHandler = ICommandHandler<
  DisciplinaCreateCommand,
  DisciplinaFindOneQueryResult
>;
