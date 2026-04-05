import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoDesvincularTurmaCommand } from "./calendario-agendamento-desvincular-turma.command";

export const CalendarioAgendamentoDesvincularTurmaCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoDesvincularTurma",
  summary: "Desvincula turma do agendamento",
});

export const ICalendarioAgendamentoDesvincularTurmaCommandHandler = Symbol(
  "ICalendarioAgendamentoDesvincularTurmaCommandHandler",
);

export type ICalendarioAgendamentoDesvincularTurmaCommandHandler = ICommandHandler<
  CalendarioAgendamentoDesvincularTurmaCommand,
  boolean
>;
