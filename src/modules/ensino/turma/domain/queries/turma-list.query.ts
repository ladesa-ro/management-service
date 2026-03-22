import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const TurmaListQueryFields = {
  ...SharedListFields,
  filterPeriodo: createFieldMetadata({
    description: "Filtro por periodo da turma",
    nullable: true,
  }),
  filterAmbientePadraoAulaNome: createFieldMetadata({
    description: "Filtro por nome do Ambiente Padrao de Aula",
    nullable: true,
  }),
  filterAmbientePadraoAulaCodigo: createFieldMetadata({
    description: "Filtro por codigo do Ambiente Padrao de Aula",
    nullable: true,
  }),
  filterAmbientePadraoAulaCapacidade: createFieldMetadata({
    description: "Filtro por capacidade do Ambiente Padrao de Aula",
    nullable: true,
  }),
  filterAmbientePadraoAulaTipo: createFieldMetadata({
    description: "Filtro por tipo do Ambiente Padrao de Aula",
    nullable: true,
  }),
  filterCursoId: createFieldMetadata({ description: "Filtro por ID do Curso", nullable: true }),
  filterCursoNome: createFieldMetadata({ description: "Filtro por nome do Curso", nullable: true }),
  filterCursoNomeAbreviado: createFieldMetadata({
    description: "Filtro por nome abreviado do Curso",
    nullable: true,
  }),
  filterCursoCampusId: createFieldMetadata({
    description: "Filtro por ID do Campus do Curso",
    nullable: true,
  }),
  filterCursoOfertaFormacaoId: createFieldMetadata({
    description: "Filtro por ID da Oferta de Formacao do Curso",
    nullable: true,
  }),
  filterCursoOfertaFormacaoNome: createFieldMetadata({
    description: "Filtro por nome da Oferta de Formacao do Curso",
    nullable: true,
  }),
  filterCursoOfertaFormacaoSlug: createFieldMetadata({
    description: "Filtro por slug da Oferta de Formacao do Curso",
    nullable: true,
  }),
};

export class TurmaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.periodo"?: IFilterAcceptableValues;
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
