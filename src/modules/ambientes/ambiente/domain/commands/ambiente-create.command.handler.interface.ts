import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteCreateCommand } from "./ambiente-create.command";

export const IAmbienteCreateCommandHandler = Symbol("IAmbienteCreateCommandHandler");

export type IAmbienteCreateCommandHandler = ICommandHandler<
  AmbienteCreateCommand,
  AmbienteFindOneQueryResult
>;
