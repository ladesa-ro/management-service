import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "./calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "./calendario-agendamento-find-one.query.result";

export const CalendarioAgendamentoFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoFindById",
  summary: "Busca um agendamento por ID",
});

export const ICalendarioAgendamentoFindOneQueryHandler = Symbol(
  "ICalendarioAgendamentoFindOneQueryHandler",
);

export type ICalendarioAgendamentoFindOneQueryHandler = IQueryHandler<
  CalendarioAgendamentoFindOneQuery,
  CalendarioAgendamentoFindOneQueryResult | null
>;
