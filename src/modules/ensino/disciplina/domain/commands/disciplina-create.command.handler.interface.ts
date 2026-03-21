import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaCreateCommand } from "./disciplina-create.command";

export const IDisciplinaCreateCommandHandler = Symbol("IDisciplinaCreateCommandHandler");

export type IDisciplinaCreateCommandHandler = ICommandHandler<
  DisciplinaCreateCommand,
  DisciplinaFindOneQueryResult
>;
