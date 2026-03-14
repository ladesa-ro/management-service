import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQueryResult } from "../queries";
import type { TurmaCreateCommand } from "./turma-create.command";
export type ITurmaCreateCommand = {
  accessContext: AccessContext;
  dto: TurmaCreateCommand;
};

export type ITurmaCreateCommandHandler = ICommandHandler<
  ITurmaCreateCommand,
  TurmaFindOneQueryResult
>;
export const ITurmaCreateCommandHandler = Symbol("ITurmaCreateCommandHandler");
