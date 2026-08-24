import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoCancelarOcorrenciaCommand } from "./calendario-agendamento-cancelar-ocorrencia.command";

export const CalendarioAgendamentoCancelarOcorrenciaCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoCancelarOcorrencia",
  summary: "Cancela uma única ocorrência de um agendamento recorrente (EXDATE)",
});

export const ICalendarioAgendamentoCancelarOcorrenciaCommandHandler = Symbol(
  "ICalendarioAgendamentoCancelarOcorrenciaCommandHandler",
);

export type ICalendarioAgendamentoCancelarOcorrenciaCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoCancelarOcorrenciaCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
