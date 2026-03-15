import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioProfessorFindOneQueryResult } from "../queries";
import type { DiarioProfessorCreateCommand } from "./diario-professor-create.command";

export type IDiarioProfessorCreateCommandHandler = ICommandHandler<
  DiarioProfessorCreateCommand,
  DiarioProfessorFindOneQueryResult
>;
export const IDiarioProfessorCreateCommandHandler = Symbol("IDiarioProfessorCreateCommandHandler");
