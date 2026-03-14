import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaCreateCommand } from "./disciplina-create.command";
export type IDisciplinaCreateCommand = {
  accessContext: AccessContext;
  dto: DisciplinaCreateCommand;
};

export type IDisciplinaCreateCommandHandler = ICommandHandler<
  IDisciplinaCreateCommand,
  DisciplinaFindOneQueryResult
>;
export const IDisciplinaCreateCommandHandler = Symbol("IDisciplinaCreateCommandHandler");
