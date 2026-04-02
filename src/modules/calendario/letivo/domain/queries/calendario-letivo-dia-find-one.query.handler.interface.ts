import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoDiaFindOneQuery } from "./calendario-letivo-dia-find-one.query";
import type { CalendarioLetivoDiaFindOneQueryResult } from "./calendario-letivo-dia-find-one.query.result";

export const CalendarioLetivoDiaFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDiaFindByData",
  summary: "Busca um dia de calendario por data (YYYY-MM-DD)",
});

export const ICalendarioLetivoDiaFindOneQueryHandler = Symbol(
  "ICalendarioLetivoDiaFindOneQueryHandler",
);

export type ICalendarioLetivoDiaFindOneQueryHandler = IQueryHandler<
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult | null
>;
