import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoListQuery } from "./estado-list.query";
import type { EstadoListQueryResult } from "./estado-list.query.result";
export type IEstadoListQuery = {
  accessContext: AccessContext;
  dto: EstadoListQuery | null;
};

export type IEstadoListQueryHandler = IQueryHandler<IEstadoListQuery, EstadoListQueryResult>;
export const IEstadoListQueryHandler = Symbol("IEstadoListQueryHandler");
