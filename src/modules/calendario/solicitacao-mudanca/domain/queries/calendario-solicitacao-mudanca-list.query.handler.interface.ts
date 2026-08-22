import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudancaListQuery } from "./calendario-solicitacao-mudanca-list.query";
import type { CalendarioSolicitacaoMudancaListQueryResult } from "./calendario-solicitacao-mudanca-list.query.result";

export const CalendarioSolicitacaoMudancaListQueryMetadata = createOperationMetadata({
  operationId: "calendarioSolicitacaoMudancaFindAll",
  summary: "Lista solicitações de mudança de agendamento",
});

export const ICalendarioSolicitacaoMudancaListQueryHandler = Symbol(
  "ICalendarioSolicitacaoMudancaListQueryHandler",
);

export type ICalendarioSolicitacaoMudancaListQueryHandler = IQueryHandler<
  CalendarioSolicitacaoMudancaListQuery | null,
  CalendarioSolicitacaoMudancaListQueryResult
>;

export const calendarioSolicitacaoMudancaPaginationSpec: IPaginationSpec = {
  sortableColumns: ["status", "tipoOperacao", "dateCreated"],
  searchableColumns: ["id", "justificativa"],
  defaultSortBy: [],
  filterableColumns: {
    status: [PaginationFilter.EQ],
    "calendarioAgendamento.id": [PaginationFilter.EQ],
    "autor.id": [PaginationFilter.EQ],
  },
};
