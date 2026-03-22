import type { IQueryHandler } from "@/domain/abstractions";
import type { CalendarioLetivoDiaListQuery } from "./calendario-letivo-dia-list.query";
import type { CalendarioLetivoDiaListQueryResult } from "./calendario-letivo-dia-list.query.result";

export const ICalendarioLetivoDiaListQueryHandler = Symbol("ICalendarioLetivoDiaListQueryHandler");

export type ICalendarioLetivoDiaListQueryHandler = IQueryHandler<
  CalendarioLetivoDiaListQuery | null,
  CalendarioLetivoDiaListQueryResult
>;
