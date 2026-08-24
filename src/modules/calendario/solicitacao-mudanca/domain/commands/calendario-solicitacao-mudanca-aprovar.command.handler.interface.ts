import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudancaFindOneQuery } from "../queries/calendario-solicitacao-mudanca-find-one.query";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../queries/calendario-solicitacao-mudanca-find-one.query.result";

export const CalendarioSolicitacaoMudancaAprovarCommandMetadata = createOperationMetadata({
  operationId: "calendarioSolicitacaoMudancaAprovar",
  summary: "Aprova uma solicitação de mudança, abrindo uma sessão de edição com a mudança proposta",
});

export const ICalendarioSolicitacaoMudancaAprovarCommandHandler = Symbol(
  "ICalendarioSolicitacaoMudancaAprovarCommandHandler",
);

export interface ICalendarioSolicitacaoMudancaAprovarResult {
  solicitacao: CalendarioSolicitacaoMudancaFindOneQueryResult;
  sessaoEdicaoId: string;
}

export type ICalendarioSolicitacaoMudancaAprovarCommandHandler = ICommandHandler<
  CalendarioSolicitacaoMudancaFindOneQuery,
  ICalendarioSolicitacaoMudancaAprovarResult
>;
