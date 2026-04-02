import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQueryResult } from "./calendario-agendamento-find-one.query.result";

export const CalendarioAgendamentoFindEventosQueryMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoFindEventos",
  summary: "Lista eventos do calendario",
});

export interface CalendarioAgendamentoFindEventosQuery {
  search?: string;
  filterTurmaId?: string;
  filterOfertaFormacaoId?: string;
}

export const ICalendarioAgendamentoFindEventosQueryHandler = Symbol(
  "ICalendarioAgendamentoFindEventosQueryHandler",
);

export type ICalendarioAgendamentoFindEventosQueryHandler = IQueryHandler<
  CalendarioAgendamentoFindEventosQuery,
  CalendarioAgendamentoFindOneQueryResult[]
>;
