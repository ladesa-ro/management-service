import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CampusFindOneQuery } from "../queries";

export const CampusDeleteCommandMetadata = createOperationMetadata({
  operationId: "campusDeleteOneById",
  summary: "Remove um campus",
});

export const ICampusDeleteCommandHandler = Symbol("ICampusDeleteCommandHandler");

export type ICampusDeleteCommandHandler = ICommandHandler<CampusFindOneQuery, boolean>;
