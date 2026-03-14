import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery, DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaUpdateCommand } from "./disciplina-update.command";
export type IDisciplinaUpdateCommand = {
  accessContext: AccessContext;
  dto: DisciplinaFindOneQuery & DisciplinaUpdateCommand;
};

export type IDisciplinaUpdateCommandHandler = ICommandHandler<
  IDisciplinaUpdateCommand,
  DisciplinaFindOneQueryResult
>;
export const IDisciplinaUpdateCommandHandler = Symbol("IDisciplinaUpdateCommandHandler");
