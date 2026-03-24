import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoDiaListQuery } from "./calendario-letivo-dia-list.query";
import type { CalendarioLetivoDiaListQueryResult } from "./calendario-letivo-dia-list.query.result";

export const CalendarioLetivoDiaListQueryMetadata = createOperationMetadata({
  operationId: "calendarioLetivoDiaFindAll",
  summary: "Lista dias de um calendario letivo",
});

export const ICalendarioLetivoDiaListQueryHandler = Symbol("ICalendarioLetivoDiaListQueryHandler");

export type ICalendarioLetivoDiaListQueryHandler = IQueryHandler<
  CalendarioLetivoDiaListQuery | null,
  CalendarioLetivoDiaListQueryResult
>;

export const calendarioLetivoDiaPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "data",
    "diaLetivo",
    "feriado",
    "calendario.id",
    "calendario.nome",
    "calendario.ano",
  ],
  searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
  defaultSortBy: [["data", "ASC"]],
  filterableColumns: {
    "calendario.id": [PaginationFilter.EQ],
    "calendario.nome": [PaginationFilter.EQ],
    "calendario.ano": [PaginationFilter.EQ],
  },
};
