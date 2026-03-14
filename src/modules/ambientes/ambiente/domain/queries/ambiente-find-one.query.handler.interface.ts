import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";
import type { AmbienteFindOneQueryResult } from "./ambiente-find-one.query.result";
export type IAmbienteFindOneQuery = {
  accessContext: AccessContext | null;
  dto: AmbienteFindOneQuery;
  selection?: string[] | boolean;
};

export type IAmbienteFindOneQueryHandler = IQueryHandler<
  IAmbienteFindOneQuery,
  AmbienteFindOneQueryResult | null
>;
export const IAmbienteFindOneQueryHandler = Symbol("IAmbienteFindOneQueryHandler");
