import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioColecaoAcessoListQuery } from "./calendario-colecao-acesso-list.query";
import type { CalendarioColecaoAcessoListQueryResult } from "./calendario-colecao-acesso-list.query.result";

export const CalendarioColecaoAcessoListQueryMetadata = createOperationMetadata({
  operationId: "calendarioColecaoAcessoFindAll",
  summary: "Lista os acessos (ACL) concedidos a uma coleção de calendário",
});

export const ICalendarioColecaoAcessoListQueryHandler = Symbol(
  "ICalendarioColecaoAcessoListQueryHandler",
);

export type ICalendarioColecaoAcessoListQueryHandler = IQueryHandler<
  CalendarioColecaoAcessoListQuery | null,
  CalendarioColecaoAcessoListQueryResult
>;

export const calendarioColecaoAcessoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["escopo", "papel"],
  searchableColumns: ["id"],
  defaultSortBy: [],
  filterableColumns: {
    "colecao.id": [PaginationFilter.EQ],
    escopo: [PaginationFilter.EQ],
  },
};
