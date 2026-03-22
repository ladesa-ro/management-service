import type { IQueryHandler } from "@/domain/abstractions";
import type { EstadoFindOneQuery } from "./estado-find-one.query";
import type { EstadoFindOneQueryResult } from "./estado-find-one.query.result";

export const IEstadoFindOneQueryHandler = Symbol("IEstadoFindOneQueryHandler");

export type IEstadoFindOneQueryHandler = IQueryHandler<
  EstadoFindOneQuery,
  EstadoFindOneQueryResult | null
>;
