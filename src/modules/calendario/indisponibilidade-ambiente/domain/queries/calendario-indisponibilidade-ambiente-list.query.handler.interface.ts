import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbienteListQuery } from "./calendario-indisponibilidade-ambiente-list.query";
import type { CalendarioIndisponibilidadeAmbienteListQueryResult } from "./calendario-indisponibilidade-ambiente-list.query.result";

export const CalendarioIndisponibilidadeAmbienteListQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeAmbienteFindAll",
  summary: "Lista indisponibilidades de ambiente",
});

export const ICalendarioIndisponibilidadeAmbienteListQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeAmbienteListQueryHandler",
);

export type ICalendarioIndisponibilidadeAmbienteListQueryHandler = IQueryHandler<
  CalendarioIndisponibilidadeAmbienteListQuery | null,
  CalendarioIndisponibilidadeAmbienteListQueryResult
>;

export const calendarioIndisponibilidadeAmbientePaginationSpec: IPaginationSpec = {
  sortableColumns: ["tipo", "diaSemana", "data", "inicio", "fim", "ambiente.id"],
  searchableColumns: ["id", "motivo"],
  defaultSortBy: [],
  filterableColumns: {
    "ambiente.id": [PaginationFilter.EQ],
    tipo: [PaginationFilter.EQ],
  },
};
