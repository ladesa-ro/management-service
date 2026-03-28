import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaListQuery } from "./turma-list.query";
import type { TurmaListQueryResult } from "./turma-list.query.result";

export const TurmaListQueryMetadata = createOperationMetadata({
  operationId: "turmaFindAll",
  summary: "Lista turmas",
});

export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");

export type ITurmaListQueryHandler = IQueryHandler<TurmaListQuery | null, TurmaListQueryResult>;

export const turmaPaginationSpec: IPaginationSpec = {
  sortableColumns: [
    "periodo",
    "ambientePadraoAula.nome",
    "ambientePadraoAula.descricao",
    "ambientePadraoAula.codigo",
    "ambientePadraoAula.capacidade",
    "ambientePadraoAula.tipo",
    "curso.nome",
    "curso.nomeAbreviado",
    "curso.campus.id",
    "curso.ofertaFormacao.modalidade.id",
    "curso.ofertaFormacao.modalidade.nome",
  ],
  searchableColumns: ["id", "periodo"],
  defaultSortBy: [["periodo", "ASC"]],
  filterableColumns: {
    periodo: [PaginationFilter.EQ],
    "ambientePadraoAula.nome": [PaginationFilter.EQ],
    "ambientePadraoAula.codigo": [PaginationFilter.EQ],
    "ambientePadraoAula.capacidade": [
      PaginationFilter.EQ,
      PaginationFilter.GT,
      PaginationFilter.GTE,
      PaginationFilter.LT,
      PaginationFilter.LTE,
    ],
    "ambientePadraoAula.tipo": [PaginationFilter.EQ],
    "curso.id": [PaginationFilter.EQ],
    "curso.nome": [PaginationFilter.EQ],
    "curso.nomeAbreviado": [PaginationFilter.EQ],
    "curso.campus.id": [PaginationFilter.EQ],
    "curso.ofertaFormacao.id": [PaginationFilter.EQ],
    "curso.ofertaFormacao.nome": [PaginationFilter.EQ],
    "curso.ofertaFormacao.slug": [PaginationFilter.EQ],
  },
};
