import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQueryResult } from "../queries";
import type { CampusCreateCommand } from "./campus-create.command";

export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");

export type ICampusCreateCommandHandler = ICommandHandler<
  CampusCreateCommand,
  CampusFindOneQueryResult
>;
