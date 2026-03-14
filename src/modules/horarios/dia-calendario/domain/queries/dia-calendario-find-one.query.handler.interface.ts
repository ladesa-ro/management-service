import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery } from "./dia-calendario-find-one.query";
import type { DiaCalendarioFindOneQueryResult } from "./dia-calendario-find-one.query.result";
export type IDiaCalendarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiaCalendarioFindOneQuery;
  selection?: string[] | boolean;
};

export type IDiaCalendarioFindOneQueryHandler = IQueryHandler<
  IDiaCalendarioFindOneQuery,
  DiaCalendarioFindOneQueryResult | null
>;
export const IDiaCalendarioFindOneQueryHandler = Symbol("IDiaCalendarioFindOneQueryHandler");
