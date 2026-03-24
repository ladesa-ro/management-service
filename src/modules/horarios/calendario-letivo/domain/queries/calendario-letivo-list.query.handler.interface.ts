import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioLetivoListQuery } from "./calendario-letivo-list.query";
import type { CalendarioLetivoListQueryResult } from "./calendario-letivo-list.query.result";

export const CalendarioLetivoListQueryMetadata = createOperationMetadata({
  operationId: "calendarioLetivoFindAll",
  summary: "Lista calendarios letivos",
});

export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  CalendarioLetivoListQuery | null,
  CalendarioLetivoListQueryResult
>;

export const calendarioLetivoPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "nome",
    "ano",
    "campus.id",
    "campus.cnpj",
    "campus.razaoSocial",
    "campus.nomeFantasia",
    "ofertaFormacao.id",
    "ofertaFormacao.nome",
    "ofertaFormacao.slug",
  ],
  searchableColumns: ["id", "nome", "ano", "campus", "ofertaFormacao"],
  defaultSortBy: [],
  filterableColumns: {
    ano: [PaginationFilter.EQ],
    "campus.id": [PaginationFilter.EQ],
    "campus.cnpj": [PaginationFilter.EQ],
    "campus.razaoSocial": [PaginationFilter.EQ],
    "campus.nomeFantasia": [PaginationFilter.EQ],
    "ofertaFormacao.id": [PaginationFilter.EQ],
    "ofertaFormacao.nome": [PaginationFilter.EQ],
    "ofertaFormacao.slug": [PaginationFilter.EQ],
  },
};
