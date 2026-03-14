import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoFindOneQuery } from "./estado-find-one.query";
import type { EstadoFindOneQueryResult } from "./estado-find-one.query.result";
export type IEstadoFindOneQuery = {
  accessContext: AccessContext;
  dto: EstadoFindOneQuery;
};

export type IEstadoFindOneQueryHandler = IQueryHandler<
  IEstadoFindOneQuery,
  EstadoFindOneQueryResult | null
>;
export const IEstadoFindOneQueryHandler = Symbol("IEstadoFindOneQueryHandler");
