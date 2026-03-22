import type { ICommandHandler } from "@/domain/abstractions";
import type { AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteCreateCommand } from "./ambiente-create.command";

export const IAmbienteCreateCommandHandler = Symbol("IAmbienteCreateCommandHandler");

export type IAmbienteCreateCommandHandler = ICommandHandler<
  AmbienteCreateCommand,
  AmbienteFindOneQueryResult
>;
