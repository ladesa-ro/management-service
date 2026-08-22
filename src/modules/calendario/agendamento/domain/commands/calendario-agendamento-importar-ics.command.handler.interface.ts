import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoImportarIcsCommand } from "./calendario-agendamento-importar-ics.command";
import type { CalendarioAgendamentoImportarIcsResult } from "./calendario-agendamento-importar-ics.command.result";

export const CalendarioAgendamentoImportarIcsCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoImportarIcs",
  summary: "Importa agendamentos a partir do conteúdo de um arquivo .ics (RFC 5545)",
});

export const ICalendarioAgendamentoImportarIcsCommandHandler = Symbol(
  "ICalendarioAgendamentoImportarIcsCommandHandler",
);

export type ICalendarioAgendamentoImportarIcsCommandHandler = ICommandHandler<
  CalendarioAgendamentoImportarIcsCommand,
  CalendarioAgendamentoImportarIcsResult
>;
