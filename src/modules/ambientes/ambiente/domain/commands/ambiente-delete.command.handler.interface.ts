import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";
export type IAmbienteDeleteCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneQuery;
};

export type IAmbienteDeleteCommandHandler = ICommandHandler<IAmbienteDeleteCommand, boolean>;
export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");
