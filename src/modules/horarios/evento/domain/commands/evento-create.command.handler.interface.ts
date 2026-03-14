import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EventoCreateInputDto, EventoFindOneOutputDto } from "../../application/dtos";

export type IEventoCreateCommand = {
  accessContext: AccessContext;
  dto: EventoCreateInputDto;
};

export type IEventoCreateCommandHandler = ICommandHandler<
  IEventoCreateCommand,
  EventoFindOneOutputDto
>;
export const IEventoCreateCommandHandler = Symbol("IEventoCreateCommandHandler");
