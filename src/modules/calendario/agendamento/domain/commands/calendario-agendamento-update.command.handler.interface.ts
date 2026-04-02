import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoUpdateCommand } from "./calendario-agendamento-update.command";

export const CalendarioAgendamentoUpdateCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoUpdate",
  summary: "Atualiza um agendamento do calendario",
});

export const ICalendarioAgendamentoUpdateCommandHandler = Symbol(
  "ICalendarioAgendamentoUpdateCommandHandler",
);

export type ICalendarioAgendamentoUpdateCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
