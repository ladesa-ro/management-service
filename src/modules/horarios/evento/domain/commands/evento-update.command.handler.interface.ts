import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoUpdateInputDto,
} from "../../application/dtos";

export type IEventoUpdateCommand = {
  accessContext: AccessContext;
  dto: EventoFindOneInputDto & EventoUpdateInputDto;
};

export type IEventoUpdateCommandHandler = ICommandHandler<
  IEventoUpdateCommand,
  EventoFindOneOutputDto
>;
export const IEventoUpdateCommandHandler = Symbol("IEventoUpdateCommandHandler");
