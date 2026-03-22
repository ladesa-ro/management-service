import type { ICommandHandler } from "@/domain/abstractions";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../queries";
import type { CampusUpdateCommand } from "./campus-update.command";

export const ICampusUpdateCommandHandler = Symbol("ICampusUpdateCommandHandler");

export type ICampusUpdateCommandHandler = ICommandHandler<
  CampusFindOneQuery & CampusUpdateCommand,
  CampusFindOneQueryResult
>;
