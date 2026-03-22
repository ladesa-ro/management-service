import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteCreateCommand } from "./ambiente-create.command";

export const AmbienteCreateCommandMetadata = createOperationMetadata({
  operationId: "ambienteCreate",
  summary: "Cria um ambiente",
});

export const IAmbienteCreateCommandHandler = Symbol("IAmbienteCreateCommandHandler");

export type IAmbienteCreateCommandHandler = ICommandHandler<
  AmbienteCreateCommand,
  AmbienteFindOneQueryResult
>;
