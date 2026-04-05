import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioAgendamentoListQuery } from "./calendario-agendamento-list.query";
import type { CalendarioAgendamentoListQueryResult } from "./calendario-agendamento-list.query.result";

export const CalendarioAgendamentoListQueryMetadata = createOperationMetadata({
  operationId: "calendarioAgendamentoFindAll",
  summary: "Lista agendamentos",
});

export const ICalendarioAgendamentoListQueryHandler = Symbol(
  "ICalendarioAgendamentoListQueryHandler",
);

export type ICalendarioAgendamentoListQueryHandler = IQueryHandler<
  CalendarioAgendamentoListQuery | null,
  CalendarioAgendamentoListQueryResult
>;

export const calendarioAgendamentoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["id", "tipo", "dataInicio", "dataFim", "status", "dateCreated"],
  searchableColumns: ["id", "tipo", "status"],
  defaultSortBy: [
    ["dataInicio", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    tipo: [PaginationFilter.EQ],
    status: [PaginationFilter.EQ],
  },
};
