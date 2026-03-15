import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoListQuery } from "./calendario-letivo-list.query";
import type { CalendarioLetivoListQueryResult } from "./calendario-letivo-list.query.result";

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  CalendarioLetivoListQuery | null,
  CalendarioLetivoListQueryResult
>;
export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");
