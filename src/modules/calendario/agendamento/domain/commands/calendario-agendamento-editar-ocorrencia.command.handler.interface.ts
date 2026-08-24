import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoEditarOcorrenciaCommand } from "./calendario-agendamento-editar-ocorrencia.command";

export const CalendarioAgendamentoEditarOcorrenciaCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoEditarOcorrencia",
  summary: "Edita uma única ocorrência de um agendamento recorrente (RECURRENCE-ID)",
});

export const ICalendarioAgendamentoEditarOcorrenciaCommandHandler = Symbol(
  "ICalendarioAgendamentoEditarOcorrenciaCommandHandler",
);

export type ICalendarioAgendamentoEditarOcorrenciaCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarOcorrenciaCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
