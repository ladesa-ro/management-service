import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorListQueryResult } from "../queries";
import type { DiarioProfessorBulkReplaceCommand } from "./diario-professor-bulk-replace.command";

export const IDiarioProfessorBulkReplaceCommandHandler = Symbol(
  "IDiarioProfessorBulkReplaceCommandHandler",
);

export type IDiarioProfessorBulkReplaceCommandHandler = ICommandHandler<
  DiarioProfessorBulkReplaceCommand,
  DiarioProfessorListQueryResult
>;
