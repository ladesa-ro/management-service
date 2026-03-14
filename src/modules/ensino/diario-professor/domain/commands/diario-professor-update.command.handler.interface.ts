import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQuery, DiarioProfessorFindOneQueryResult } from "../queries";
import type { DiarioProfessorUpdateCommand } from "./diario-professor-update.command";
export type IDiarioProfessorUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorFindOneQuery & DiarioProfessorUpdateCommand;
};

export type IDiarioProfessorUpdateCommandHandler = ICommandHandler<
  IDiarioProfessorUpdateCommand,
  DiarioProfessorFindOneQueryResult
>;
export const IDiarioProfessorUpdateCommandHandler = Symbol("IDiarioProfessorUpdateCommandHandler");
