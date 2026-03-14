import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class TurmaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.nome"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.codigo"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.capacidade"?: IFilterAcceptableValues;
  "filter.ambientePadraoAula.tipo"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.curso.nome"?: IFilterAcceptableValues;
  "filter.curso.nomeAbreviado"?: IFilterAcceptableValues;
  "filter.curso.campus.id"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.id"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.nome"?: IFilterAcceptableValues;
  "filter.curso.ofertaFormacao.slug"?: IFilterAcceptableValues;
}
