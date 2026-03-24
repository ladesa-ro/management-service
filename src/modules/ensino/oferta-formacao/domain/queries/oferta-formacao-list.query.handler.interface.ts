import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoListQuery } from "./oferta-formacao-list.query";
import type { OfertaFormacaoListQueryResult } from "./oferta-formacao-list.query.result";

export const OfertaFormacaoListQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoFindAll",
  summary: "Lista ofertas de formacao",
});

export const IOfertaFormacaoListQueryHandler = Symbol("IOfertaFormacaoListQueryHandler");

export type IOfertaFormacaoListQueryHandler = IQueryHandler<
  OfertaFormacaoListQuery | null,
  OfertaFormacaoListQueryResult
>;

export const ofertaFormacaoPaginationSpec: IPaginationSpec = {
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {
    "modalidade.id": [PaginationFilter.EQ],
    "campus.id": [PaginationFilter.EQ],
  },
};
