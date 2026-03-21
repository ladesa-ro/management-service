import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery, TurmaFindOneQueryResult } from "../queries";
import type { TurmaUpdateCommand } from "./turma-update.command";

export const ITurmaUpdateCommandHandler = Symbol("ITurmaUpdateCommandHandler");

export type ITurmaUpdateCommandHandler = ICommandHandler<
  TurmaFindOneQuery & TurmaUpdateCommand,
  TurmaFindOneQueryResult
>;
