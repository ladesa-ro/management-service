import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQueryResult } from "../queries";
import type { CampusCreateCommand } from "./campus-create.command";

export type ICampusCreateCommandHandler = ICommandHandler<
  CampusCreateCommand,
  CampusFindOneQueryResult
>;
export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");
