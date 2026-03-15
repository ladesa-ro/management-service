import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../queries";
import type { CampusUpdateCommand } from "./campus-update.command";

export type ICampusUpdateCommandHandler = ICommandHandler<
  CampusFindOneQuery & CampusUpdateCommand,
  CampusFindOneQueryResult
>;
export const ICampusUpdateCommandHandler = Symbol("ICampusUpdateCommandHandler");
