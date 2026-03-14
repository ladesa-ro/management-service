import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQueryResult } from "../queries";
import type { AmbienteCreateCommand } from "./ambiente-create.command";
export type IAmbienteCreateCommand = {
  accessContext: AccessContext;
  dto: AmbienteCreateCommand;
};

export type IAmbienteCreateCommandHandler = ICommandHandler<
  IAmbienteCreateCommand,
  AmbienteFindOneQueryResult
>;
export const IAmbienteCreateCommandHandler = Symbol("IAmbienteCreateCommandHandler");
