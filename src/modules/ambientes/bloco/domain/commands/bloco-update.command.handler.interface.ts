import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery, BlocoFindOneQueryResult } from "../queries";
import type { BlocoUpdateCommand } from "./bloco-update.command";
export type IBlocoUpdateCommand = {
  accessContext: AccessContext;
  dto: BlocoFindOneQuery & BlocoUpdateCommand;
};

export type IBlocoUpdateCommandHandler = ICommandHandler<
  IBlocoUpdateCommand,
  BlocoFindOneQueryResult
>;
export const IBlocoUpdateCommandHandler = Symbol("IBlocoUpdateCommandHandler");
