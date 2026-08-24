import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoLinhaDoTempoQuery } from "./calendario-agendamento-linha-do-tempo.query";
import type { CalendarioAgendamentoLinhaDoTempoQueryResult } from "./calendario-agendamento-linha-do-tempo.query.result";

export const CalendarioAgendamentoLinhaDoTempoQueryMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoLinhaDoTempo",
  summary: "Histórico de versões de um agendamento, com autor, motivo e o que mudou entre versões",
});

export const ICalendarioAgendamentoLinhaDoTempoQueryHandler = Symbol(
  "ICalendarioAgendamentoLinhaDoTempoQueryHandler",
);

export type ICalendarioAgendamentoLinhaDoTempoQueryHandler = IQueryHandler<
  CalendarioAgendamentoLinhaDoTempoQuery,
  CalendarioAgendamentoLinhaDoTempoQueryResult | null
>;
