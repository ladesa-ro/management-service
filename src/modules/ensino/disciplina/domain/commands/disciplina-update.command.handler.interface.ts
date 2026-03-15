import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery, DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaUpdateCommand } from "./disciplina-update.command";

export type IDisciplinaUpdateCommandHandler = ICommandHandler<
  DisciplinaFindOneQuery & DisciplinaUpdateCommand,
  DisciplinaFindOneQueryResult
>;
export const IDisciplinaUpdateCommandHandler = Symbol("IDisciplinaUpdateCommandHandler");
