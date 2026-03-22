import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "../queries";

export const DisciplinaDeleteCommandMetadata = createOperationMetadata({
  operationId: "disciplinaDeleteOneById",
  summary: "Remove uma disciplina",
});

export const IDisciplinaDeleteCommandHandler = Symbol("IDisciplinaDeleteCommandHandler");

export type IDisciplinaDeleteCommandHandler = ICommandHandler<DisciplinaFindOneQuery, boolean>;
