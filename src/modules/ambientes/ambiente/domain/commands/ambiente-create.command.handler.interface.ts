import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteCreateInputDto, AmbienteFindOneOutputDto } from "../../application/dtos";

export type IAmbienteCreateCommand = {
  accessContext: AccessContext;
  dto: AmbienteCreateInputDto;
};

export type IAmbienteCreateCommandHandler = ICommandHandler<
  IAmbienteCreateCommand,
  AmbienteFindOneOutputDto
>;
export const IAmbienteCreateCommandHandler = Symbol("IAmbienteCreateCommandHandler");
