import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteUpdateInputDto,
} from "../../application/dtos";

export type IAmbienteUpdateCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto;
};

export type IAmbienteUpdateCommandHandler = ICommandHandler<
  IAmbienteUpdateCommand,
  AmbienteFindOneOutputDto
>;
export const IAmbienteUpdateCommandHandler = Symbol("IAmbienteUpdateCommandHandler");
