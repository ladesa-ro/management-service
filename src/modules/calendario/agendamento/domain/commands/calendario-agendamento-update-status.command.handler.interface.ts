import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoUpdateStatusCommand } from "./calendario-agendamento-update-status.command";

export const CalendarioAgendamentoUpdateStatusCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoUpdateStatus",
  summary: "Atualiza status do agendamento",
});

export const ICalendarioAgendamentoUpdateStatusCommandHandler = Symbol(
  "ICalendarioAgendamentoUpdateStatusCommandHandler",
);

export type ICalendarioAgendamentoUpdateStatusCommandHandler = ICommandHandler<
  CalendarioAgendamentoUpdateStatusCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
