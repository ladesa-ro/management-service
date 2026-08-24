import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoAdicionarDataAvulsaCommand } from "./calendario-agendamento-adicionar-data-avulsa.command";

export const CalendarioAgendamentoAdicionarDataAvulsaCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoAdicionarDataAvulsa",
  summary: "Adiciona uma data avulsa a um agendamento recorrente (RDATE)",
});

export const ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler = Symbol(
  "ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler",
);

export type ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoAdicionarDataAvulsaCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
