import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";

export const CalendarioAgendamentoDeleteCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoDeleteOneById",
  summary: "Remove um agendamento do calendario",
});

export const ICalendarioAgendamentoDeleteCommandHandler = Symbol(
  "ICalendarioAgendamentoDeleteCommandHandler",
);

export type ICalendarioAgendamentoDeleteCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery,
  boolean
>;
