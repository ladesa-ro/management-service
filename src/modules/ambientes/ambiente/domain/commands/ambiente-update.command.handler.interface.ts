import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery, AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteUpdateCommand } from "./ambiente-update.command";
export type IAmbienteUpdateCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneQuery & AmbienteUpdateCommand;
};

export type IAmbienteUpdateCommandHandler = ICommandHandler<
  IAmbienteUpdateCommand,
  AmbienteFindOneQueryResult
>;
export const IAmbienteUpdateCommandHandler = Symbol("IAmbienteUpdateCommandHandler");
