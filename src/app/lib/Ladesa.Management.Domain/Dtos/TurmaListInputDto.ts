import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class TurmaListInputDto extends PaginationInputDto {
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
