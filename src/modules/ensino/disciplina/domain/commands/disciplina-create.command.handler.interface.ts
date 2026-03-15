import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQueryResult } from "../queries";
import type { DisciplinaCreateCommand } from "./disciplina-create.command";

export type IDisciplinaCreateCommandHandler = ICommandHandler<
  DisciplinaCreateCommand,
  DisciplinaFindOneQueryResult
>;
export const IDisciplinaCreateCommandHandler = Symbol("IDisciplinaCreateCommandHandler");
