import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoFindOneQuery } from "./calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "./calendario-colecao-find-one.query.result";

export const CalendarioColecaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioColecaoFindOneById",
  summary: "Busca uma coleção de calendário por ID",
});

export const ICalendarioColecaoFindOneQueryHandler = Symbol(
  "ICalendarioColecaoFindOneQueryHandler",
);

export type ICalendarioColecaoFindOneQueryHandler = IQueryHandler<
  CalendarioColecaoFindOneQuery,
  CalendarioColecaoFindOneQueryResult | null
>;
