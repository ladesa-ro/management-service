import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteFindOneQuery, AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteUpdateCommand } from "./ambiente-update.command";

export const AmbienteUpdateCommandMetadata = createOperationMetadata({
  operationId: "ambienteUpdate",
  summary: "Atualiza um ambiente",
});

export const IAmbienteUpdateCommandHandler = Symbol("IAmbienteUpdateCommandHandler");

export type IAmbienteUpdateCommandHandler = ICommandHandler<
  AmbienteFindOneQuery & AmbienteUpdateCommand,
  AmbienteFindOneQueryResult
>;
