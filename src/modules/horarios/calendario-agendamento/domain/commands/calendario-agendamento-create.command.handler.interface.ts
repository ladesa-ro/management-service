import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoCreateCommand } from "./calendario-agendamento-create.command";

export const CalendarioAgendamentoCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoCreate",
  summary: "Cria um agendamento no calendario",
});

export const ICalendarioAgendamentoCreateCommandHandler = Symbol(
  "ICalendarioAgendamentoCreateCommandHandler",
);

export type ICalendarioAgendamentoCreateCommandHandler = ICommandHandler<
  CalendarioAgendamentoCreateCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
