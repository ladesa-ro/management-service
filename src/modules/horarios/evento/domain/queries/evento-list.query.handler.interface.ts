import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EventoListInputDto, EventoListOutputDto } from "../../application/dtos";

export type IEventoListQuery = {
  accessContext: AccessContext;
  dto: EventoListInputDto | null;
  selection?: string[] | boolean;
};

export type IEventoListQueryHandler = IQueryHandler<IEventoListQuery, EventoListOutputDto>;
export const IEventoListQueryHandler = Symbol("IEventoListQueryHandler");
