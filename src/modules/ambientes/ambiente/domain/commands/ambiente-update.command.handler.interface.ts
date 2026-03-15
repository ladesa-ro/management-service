import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery, AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteUpdateCommand } from "./ambiente-update.command";

export type IAmbienteUpdateCommandHandler = ICommandHandler<
  AmbienteFindOneQuery & AmbienteUpdateCommand,
  AmbienteFindOneQueryResult
>;
export const IAmbienteUpdateCommandHandler = Symbol("IAmbienteUpdateCommandHandler");
