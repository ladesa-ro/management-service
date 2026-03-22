import type { IQueryHandler } from "@/domain/abstractions";
import type { CalendarioLetivoListQuery } from "./calendario-letivo-list.query";
import type { CalendarioLetivoListQueryResult } from "./calendario-letivo-list.query.result";

export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  CalendarioLetivoListQuery | null,
  CalendarioLetivoListQueryResult
>;
