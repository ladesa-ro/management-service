import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQueryResult } from "../queries";
import type { BlocoCreateCommand } from "./bloco-create.command";
export type IBlocoCreateCommand = {
  accessContext: AccessContext;
  dto: BlocoCreateCommand;
};

export type IBlocoCreateCommandHandler = ICommandHandler<
  IBlocoCreateCommand,
  BlocoFindOneQueryResult
>;
export const IBlocoCreateCommandHandler = Symbol("IBlocoCreateCommandHandler");
