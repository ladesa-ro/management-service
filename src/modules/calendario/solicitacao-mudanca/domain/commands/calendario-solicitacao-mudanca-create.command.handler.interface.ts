import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../queries/calendario-solicitacao-mudanca-find-one.query.result";
import type { CalendarioSolicitacaoMudancaCreateCommand } from "./calendario-solicitacao-mudanca-create.command";

export const CalendarioSolicitacaoMudancaCreateCommandMetadata = createOperationMetadata({
  operationId: "calendarioSolicitacaoMudancaCreate",
  summary: "Cria uma solicitação de mudança para um agendamento",
});

export const ICalendarioSolicitacaoMudancaCreateCommandHandler = Symbol(
  "ICalendarioSolicitacaoMudancaCreateCommandHandler",
);

export type ICalendarioSolicitacaoMudancaCreateCommandHandler = ICommandHandler<
  CalendarioSolicitacaoMudancaCreateCommand,
  CalendarioSolicitacaoMudancaFindOneQueryResult
>;
