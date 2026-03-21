import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoFindOneQuery } from "./calendario-letivo-find-one.query";
import type { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";

export const ICalendarioLetivoFindOneQueryHandler = Symbol("ICalendarioLetivoFindOneQueryHandler");

export type ICalendarioLetivoFindOneQueryHandler = IQueryHandler<
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult | null
>;
