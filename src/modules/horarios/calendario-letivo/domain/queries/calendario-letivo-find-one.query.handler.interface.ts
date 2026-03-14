import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "./calendario-letivo-find-one.query";
import type { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";
export type ICalendarioLetivoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CalendarioLetivoFindOneQuery;
  selection?: string[] | boolean;
};

export type ICalendarioLetivoFindOneQueryHandler = IQueryHandler<
  ICalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult | null
>;
export const ICalendarioLetivoFindOneQueryHandler = Symbol("ICalendarioLetivoFindOneQueryHandler");
