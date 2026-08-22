import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudancaFindOneQuery } from "./calendario-solicitacao-mudanca-find-one.query";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "./calendario-solicitacao-mudanca-find-one.query.result";

export const CalendarioSolicitacaoMudancaFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioSolicitacaoMudancaFindOneById",
  summary: "Busca uma solicitação de mudança por ID",
});

export const ICalendarioSolicitacaoMudancaFindOneQueryHandler = Symbol(
  "ICalendarioSolicitacaoMudancaFindOneQueryHandler",
);

export type ICalendarioSolicitacaoMudancaFindOneQueryHandler = IQueryHandler<
  CalendarioSolicitacaoMudancaFindOneQuery,
  CalendarioSolicitacaoMudancaFindOneQueryResult | null
>;
