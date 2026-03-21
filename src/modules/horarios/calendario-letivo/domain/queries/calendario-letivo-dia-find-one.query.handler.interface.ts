import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoDiaFindOneQuery } from "./calendario-letivo-dia-find-one.query";
import type { CalendarioLetivoDiaFindOneQueryResult } from "./calendario-letivo-dia-find-one.query.result";

export const ICalendarioLetivoDiaFindOneQueryHandler = Symbol(
  "ICalendarioLetivoDiaFindOneQueryHandler",
);

export type ICalendarioLetivoDiaFindOneQueryHandler = IQueryHandler<
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult | null
>;
