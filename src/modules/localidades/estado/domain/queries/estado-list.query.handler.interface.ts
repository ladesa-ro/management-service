import type { IQueryHandler } from "@/domain/abstractions";
import type { EstadoListQuery } from "./estado-list.query";
import type { EstadoListQueryResult } from "./estado-list.query.result";

export const IEstadoListQueryHandler = Symbol("IEstadoListQueryHandler");

export type IEstadoListQueryHandler = IQueryHandler<EstadoListQuery | null, EstadoListQueryResult>;
