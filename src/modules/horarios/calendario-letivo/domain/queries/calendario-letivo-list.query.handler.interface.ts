import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoListQuery } from "./calendario-letivo-list.query";
import type { CalendarioLetivoListQueryResult } from "./calendario-letivo-list.query.result";

export const CalendarioLetivoListQueryMetadata = createOperationMetadata({
  operationId: "calendarioLetivoFindAll",
  summary: "Lista calendarios letivos",
});

export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  CalendarioLetivoListQuery | null,
  CalendarioLetivoListQueryResult
>;
