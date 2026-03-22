import type { IQueryHandler } from "@/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "./calendario-letivo-find-one.query";
import type { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";

export const ICalendarioLetivoFindOneQueryHandler = Symbol("ICalendarioLetivoFindOneQueryHandler");

export type ICalendarioLetivoFindOneQueryHandler = IQueryHandler<
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult | null
>;
