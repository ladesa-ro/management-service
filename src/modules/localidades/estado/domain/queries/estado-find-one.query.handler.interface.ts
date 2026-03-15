import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoFindOneQuery } from "./estado-find-one.query";
import type { EstadoFindOneQueryResult } from "./estado-find-one.query.result";

export type IEstadoFindOneQueryHandler = IQueryHandler<
  EstadoFindOneQuery,
  EstadoFindOneQueryResult | null
>;
export const IEstadoFindOneQueryHandler = Symbol("IEstadoFindOneQueryHandler");
