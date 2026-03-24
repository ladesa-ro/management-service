import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQuery } from "./diario-preferencia-agrupamento-list.query";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "./diario-preferencia-agrupamento-list.query.result";

export const DiarioPreferenciaAgrupamentoListQueryMetadata = createOperationMetadata({
  operationId: "diarioPreferenciaAgrupamentoFindAll",
  summary: "Lista preferencias de agrupamento de um diario",
});

export const IDiarioPreferenciaAgrupamentoListQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoListQueryHandler",
);

export type IDiarioPreferenciaAgrupamentoListQueryHandler = IQueryHandler<
  DiarioPreferenciaAgrupamentoListQuery | null,
  DiarioPreferenciaAgrupamentoListQueryResult
>;

export const diarioPreferenciaAgrupamentoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim", "diario.id"],
  searchableColumns: ["id", "diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"],
  defaultSortBy: [],
  filterableColumns: {
    "diario.id": [PaginationFilter.EQ],
  },
};
