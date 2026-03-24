import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoListQuery } from "./curso-list.query";
import type { CursoListQueryResult } from "./curso-list.query.result";

export const CursoListQueryMetadata = createOperationMetadata({
  operationId: "cursoFindAll",
  summary: "Lista cursos",
});

export const ICursoListQueryHandler = Symbol("ICursoListQueryHandler");

export type ICursoListQueryHandler = IQueryHandler<CursoListQuery | null, CursoListQueryResult>;

export const cursoPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "nome",
    "nomeAbreviado",
    "campus.id",
    "campus.cnpj",
    "campus.razaoSocial",
    "campus.nomeFantasia",
    "ofertaFormacao.id",
    "ofertaFormacao.nome",
    "ofertaFormacao.slug",
  ],
  searchableColumns: ["id", "nome", "nomeAbreviado", "campus", "ofertaFormacao"],
  defaultSortBy: [["nome", "ASC"]],
  filterableColumns: {
    "campus.id": [PaginationFilter.EQ],
    "campus.cnpj": [PaginationFilter.EQ],
    "campus.razaoSocial": [PaginationFilter.EQ],
    "campus.nomeFantasia": [PaginationFilter.EQ],
    "ofertaFormacao.id": [PaginationFilter.EQ],
    "ofertaFormacao.nome": [PaginationFilter.EQ],
    "ofertaFormacao.slug": [PaginationFilter.EQ],
  },
};
