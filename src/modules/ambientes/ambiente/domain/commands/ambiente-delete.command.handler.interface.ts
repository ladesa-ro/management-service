import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneInputDto } from "../../application/dtos";

export type IAmbienteDeleteCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneInputDto;
};

export type IAmbienteDeleteCommandHandler = ICommandHandler<IAmbienteDeleteCommand, boolean>;
export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");
