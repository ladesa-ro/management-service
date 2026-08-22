import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoListQuery } from "./calendario-colecao-list.query";
import type { CalendarioColecaoListQueryResult } from "./calendario-colecao-list.query.result";

export const CalendarioColecaoListQueryMetadata = createOperationMetadata({
  operationId: "calendarioColecaoFindAll",
  summary: "Lista coleções de calendário visíveis ao requisitante",
});

export const ICalendarioColecaoListQueryHandler = Symbol("ICalendarioColecaoListQueryHandler");

export type ICalendarioColecaoListQueryHandler = IQueryHandler<
  CalendarioColecaoListQuery | null,
  CalendarioColecaoListQueryResult
>;

export const calendarioColecaoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["nome", "visibilidade", "campus.id", "campus.nomeFantasia"],
  searchableColumns: ["id", "nome"],
  defaultSortBy: [],
  filterableColumns: {
    "campus.id": [PaginationFilter.EQ],
    visibilidade: [PaginationFilter.EQ],
  },
};
