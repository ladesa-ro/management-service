import type { ICommandHandler } from "@/domain/abstractions";
import type { TurmaFindOneQueryResult } from "../queries";
import type { TurmaCreateCommand } from "./turma-create.command";

export const ITurmaCreateCommandHandler = Symbol("ITurmaCreateCommandHandler");

export type ITurmaCreateCommandHandler = ICommandHandler<
  TurmaCreateCommand,
  TurmaFindOneQueryResult
>;
