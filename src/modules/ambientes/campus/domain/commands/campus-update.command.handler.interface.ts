import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../queries";
import type { CampusUpdateCommand } from "./campus-update.command";
export type ICampusUpdateCommand = {
  accessContext: AccessContext;
  dto: CampusFindOneQuery & CampusUpdateCommand;
};

export type ICampusUpdateCommandHandler = ICommandHandler<
  ICampusUpdateCommand,
  CampusFindOneQueryResult
>;
export const ICampusUpdateCommandHandler = Symbol("ICampusUpdateCommandHandler");
