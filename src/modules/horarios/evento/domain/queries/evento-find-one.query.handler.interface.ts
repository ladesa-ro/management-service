import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EventoFindOneInputDto, EventoFindOneOutputDto } from "../../application/dtos";

export type IEventoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EventoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IEventoFindOneQueryHandler = IQueryHandler<
  IEventoFindOneQuery,
  EventoFindOneOutputDto | null
>;
export const IEventoFindOneQueryHandler = Symbol("IEventoFindOneQueryHandler");
