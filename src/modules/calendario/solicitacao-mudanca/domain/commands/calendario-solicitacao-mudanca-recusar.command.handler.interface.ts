import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudancaFindOneQuery } from "../queries/calendario-solicitacao-mudanca-find-one.query";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../queries/calendario-solicitacao-mudanca-find-one.query.result";
import type { CalendarioSolicitacaoMudancaRecusarCommand } from "./calendario-solicitacao-mudanca-recusar.command";

export const CalendarioSolicitacaoMudancaRecusarCommandMetadata = createOperationMetadata({
  operationId: "calendarioSolicitacaoMudancaRecusar",
  summary: "Recusa uma solicitação de mudança",
});

export const ICalendarioSolicitacaoMudancaRecusarCommandHandler = Symbol(
  "ICalendarioSolicitacaoMudancaRecusarCommandHandler",
);

export type ICalendarioSolicitacaoMudancaRecusarCommandHandler = ICommandHandler<
  CalendarioSolicitacaoMudancaFindOneQuery & CalendarioSolicitacaoMudancaRecusarCommand,
  CalendarioSolicitacaoMudancaFindOneQueryResult
>;
