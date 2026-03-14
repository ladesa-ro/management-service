import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EventoFindOneInputDto } from "../../application/dtos";

export type IEventoDeleteCommand = {
  accessContext: AccessContext;
  dto: EventoFindOneInputDto;
};

export type IEventoDeleteCommandHandler = ICommandHandler<IEventoDeleteCommand, boolean>;
export const IEventoDeleteCommandHandler = Symbol("IEventoDeleteCommandHandler");
