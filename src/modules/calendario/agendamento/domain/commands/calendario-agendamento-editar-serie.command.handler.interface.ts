import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoFindOneQuery } from "../queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../queries/calendario-agendamento-find-one.query.result";
import type { CalendarioAgendamentoEditarSerieCommand } from "./calendario-agendamento-editar-serie.command";

export const CalendarioAgendamentoEditarSerieCommandMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoEditarSerie",
  summary:
    "Edita uma série recorrente inteira ou a partir de uma ocorrência (ESTA_E_SEGUINTES/TODAS)",
});

export const ICalendarioAgendamentoEditarSerieCommandHandler = Symbol(
  "ICalendarioAgendamentoEditarSerieCommandHandler",
);

export type ICalendarioAgendamentoEditarSerieCommandHandler = ICommandHandler<
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarSerieCommand,
  CalendarioAgendamentoFindOneQueryResult
>;
