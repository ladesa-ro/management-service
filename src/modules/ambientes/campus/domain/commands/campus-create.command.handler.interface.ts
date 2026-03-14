import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQueryResult } from "../queries";
import type { CampusCreateCommand } from "./campus-create.command";
export type ICampusCreateCommand = {
  accessContext: AccessContext;
  dto: CampusCreateCommand;
};

export type ICampusCreateCommandHandler = ICommandHandler<
  ICampusCreateCommand,
  CampusFindOneQueryResult
>;
export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");
