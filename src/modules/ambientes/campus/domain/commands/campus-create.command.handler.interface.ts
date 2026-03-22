import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CampusFindOneQueryResult } from "../queries";
import type { CampusCreateCommand } from "./campus-create.command";

export const CampusCreateCommandMetadata = createOperationMetadata({
  operationId: "campusCreate",
  summary: "Cria um campus",
});

export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");

export type ICampusCreateCommandHandler = ICommandHandler<
  CampusCreateCommand,
  CampusFindOneQueryResult
>;
