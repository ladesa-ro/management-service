import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioProfessorListQueryResult } from "../queries";
import type { DiarioProfessorBulkReplaceCommand } from "./diario-professor-bulk-replace.command";

export const DiarioProfessorBulkReplaceCommandMetadata = createOperationMetadata({
  operationId: "diarioProfessorBulkReplace",
  summary: "Substitui professores de um diario",
});

export const IDiarioProfessorBulkReplaceCommandHandler = Symbol(
  "IDiarioProfessorBulkReplaceCommandHandler",
);

export type IDiarioProfessorBulkReplaceCommandHandler = ICommandHandler<
  DiarioProfessorBulkReplaceCommand,
  DiarioProfessorListQueryResult
>;
