import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQueryResult } from "../queries";
import type { DiarioProfessorCreateCommand } from "./diario-professor-create.command";
export type IDiarioProfessorCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorCreateCommand;
};

export type IDiarioProfessorCreateCommandHandler = ICommandHandler<
  IDiarioProfessorCreateCommand,
  DiarioProfessorFindOneQueryResult
>;
export const IDiarioProfessorCreateCommandHandler = Symbol("IDiarioProfessorCreateCommandHandler");
