import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery, DiarioProfessorFindOneQueryResult } from "../queries";
import type { DiarioProfessorUpdateCommand } from "./diario-professor-update.command";

export type IDiarioProfessorUpdateCommandHandler = ICommandHandler<
  DiarioProfessorFindOneQuery & DiarioProfessorUpdateCommand,
  DiarioProfessorFindOneQueryResult
>;
export const IDiarioProfessorUpdateCommandHandler = Symbol("IDiarioProfessorUpdateCommandHandler");
