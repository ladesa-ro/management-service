import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CampusFindOneQuery, CampusFindOneQueryResult } from "../queries";
import type { CampusUpdateCommand } from "./campus-update.command";

export const CampusUpdateCommandMetadata = createOperationMetadata({
  operationId: "campusUpdate",
  summary: "Atualiza um campus",
});

export const ICampusUpdateCommandHandler = Symbol("ICampusUpdateCommandHandler");

export type ICampusUpdateCommandHandler = ICommandHandler<
  CampusFindOneQuery & CampusUpdateCommand,
  CampusFindOneQueryResult
>;
