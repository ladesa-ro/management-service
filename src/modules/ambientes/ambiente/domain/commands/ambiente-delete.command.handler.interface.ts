import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export const AmbienteDeleteCommandMetadata = createOperationMetadata({
  operationId: "ambienteDeleteOneById",
  summary: "Remove um ambiente",
});

export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");

export type IAmbienteDeleteCommandHandler = ICommandHandler<AmbienteFindOneQuery, boolean>;
