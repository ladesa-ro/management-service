import * as AmbienteGraphqlMapper from "@/modules/ambientes/ambiente/presentation.graphql/ambiente.graphql.mapper";
import * as CursoGraphqlMapper from "@/modules/ensino/curso/presentation.graphql/curso.graphql.mapper";
import {
  TurmaCreateCommand,
  TurmaFindOneQuery,
  type TurmaFindOneQueryResult,
  TurmaListQuery,
  TurmaUpdateCommand,
} from "@/modules/ensino/turma";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  into,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type TurmaCreateInputGraphQlDto,
  TurmaFindOneOutputGraphQlDto,
  type TurmaListInputGraphQlDto,
  TurmaListOutputGraphQlDto,
  type TurmaUpdateInputGraphQlDto,
} from "./turma.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, TurmaFindOneQuery>((id) => {
  const input = new TurmaFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<TurmaListInputGraphQlDto, TurmaListQuery>(
  TurmaListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");

    into(query).field("filter.ambientePadraoAula.nome").from(dto, "filterAmbientePadraoAulaNome");

    into(query)
      .field("filter.ambientePadraoAula.codigo")
      .from(dto, "filterAmbientePadraoAulaCodigo");

    into(query)
      .field("filter.ambientePadraoAula.capacidade")
      .from(dto, "filterAmbientePadraoAulaCapacidade");

    into(query).field("filter.ambientePadraoAula.tipo").from(dto, "filterAmbientePadraoAulaTipo");

    into(query).field("filter.curso.id").from(dto, "filterCursoId");

    into(query).field("filter.curso.nome").from(dto, "filterCursoNome");

    into(query).field("filter.curso.nomeAbreviado").from(dto, "filterCursoNomeAbreviado");

    into(query).field("filter.curso.campus.id").from(dto, "filterCursoCampusId");

    into(query).field("filter.curso.ofertaFormacao.id").from(dto, "filterCursoOfertaFormacaoId");

    into(query)
      .field("filter.curso.ofertaFormacao.nome")
      .from(dto, "filterCursoOfertaFormacaoNome");

    into(query)
      .field("filter.curso.ofertaFormacao.slug")
      .from(dto, "filterCursoOfertaFormacaoSlug");
  },
);

export function listInputDtoToListQuery(
  dto: TurmaListInputGraphQlDto | null,
): TurmaListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  TurmaCreateInputGraphQlDto,
  TurmaCreateCommand
>((dto) => ({
  periodo: dto.periodo,
  curso: { id: dto.curso.id },
  ambientePadraoAula: dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null,
  imagemCapa: dto.imagemCapa ? { id: dto.imagemCapa.id } : null,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: TurmaUpdateInputGraphQlDto },
  TurmaFindOneQuery & TurmaUpdateCommand
>(({ id, dto }) => ({
  id,
  periodo: dto.periodo,
  curso: dto.curso ? { id: dto.curso.id } : undefined,
  ambientePadraoAula:
    dto.ambientePadraoAula !== undefined
      ? dto.ambientePadraoAula
        ? { id: dto.ambientePadraoAula.id }
        : null
      : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  TurmaFindOneQueryResult,
  TurmaFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  periodo: output.periodo,
  curso: CursoGraphqlMapper.findOneQueryResultToOutputDto.map(output.curso),
  ambientePadraoAula: output.ambientePadraoAula
    ? AmbienteGraphqlMapper.findOneQueryResultToOutputDto.map(output.ambientePadraoAula)
    : null,
  imagemCapa: mapImagemOutput(output.imagemCapa),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  TurmaListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
