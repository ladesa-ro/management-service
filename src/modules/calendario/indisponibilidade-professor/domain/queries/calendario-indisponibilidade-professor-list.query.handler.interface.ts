import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessorListQuery } from "./calendario-indisponibilidade-professor-list.query";
import type { CalendarioIndisponibilidadeProfessorListQueryResult } from "./calendario-indisponibilidade-professor-list.query.result";

export const CalendarioIndisponibilidadeProfessorListQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeProfessorFindAll",
  summary: "Lista indisponibilidades de professor",
});

export const ICalendarioIndisponibilidadeProfessorListQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeProfessorListQueryHandler",
);

export type ICalendarioIndisponibilidadeProfessorListQueryHandler = IQueryHandler<
  CalendarioIndisponibilidadeProfessorListQuery | null,
  CalendarioIndisponibilidadeProfessorListQueryResult
>;

export const calendarioIndisponibilidadeProfessorPaginationSpec: IPaginationSpec = {
  sortableColumns: ["tipo", "diaSemana", "data", "inicio", "fim", "perfil.id"],
  searchableColumns: ["id", "motivo"],
  defaultSortBy: [],
  filterableColumns: {
    "perfil.id": [PaginationFilter.EQ],
    tipo: [PaginationFilter.EQ],
  },
};
