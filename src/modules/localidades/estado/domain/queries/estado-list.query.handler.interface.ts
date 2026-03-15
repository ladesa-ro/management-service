import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoListQuery } from "./estado-list.query";
import type { EstadoListQueryResult } from "./estado-list.query.result";

export type IEstadoListQueryHandler = IQueryHandler<EstadoListQuery | null, EstadoListQueryResult>;
export const IEstadoListQueryHandler = Symbol("IEstadoListQueryHandler");
