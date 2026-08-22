import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoExportarIcsQuery } from "./calendario-agendamento-exportar-ics.query";
import type { CalendarioAgendamentoExportarIcsQueryResult } from "./calendario-agendamento-exportar-ics.query.result";

export const CalendarioAgendamentoExportarIcsQueryMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoExportarIcs",
  summary: "Exporta ocorrências de agendamento como arquivo .ics (RFC 5545)",
});

export const ICalendarioAgendamentoExportarIcsQueryHandler = Symbol(
  "ICalendarioAgendamentoExportarIcsQueryHandler",
);

export interface ICalendarioAgendamentoExportarIcsQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoExportarIcsQuery,
  ): Promise<CalendarioAgendamentoExportarIcsQueryResult>;
}
