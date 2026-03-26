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
  mapField,
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

export const toFindOneInput = createMapper<string, TurmaFindOneQuery>((id) => {
  const input = new TurmaFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<TurmaListInputGraphQlDto, TurmaListQuery>(
  TurmaListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.ambientePadraoAula.nome", dto, "filterAmbientePadraoAulaNome");
    mapField(query, "filter.ambientePadraoAula.codigo", dto, "filterAmbientePadraoAulaCodigo");
    mapField(
      query,
      "filter.ambientePadraoAula.capacidade",
      dto,
      "filterAmbientePadraoAulaCapacidade",
    );
    mapField(query, "filter.ambientePadraoAula.tipo", dto, "filterAmbientePadraoAulaTipo");
    mapField(query, "filter.curso.id", dto, "filterCursoId");
    mapField(query, "filter.curso.nome", dto, "filterCursoNome");
    mapField(query, "filter.curso.nomeAbreviado", dto, "filterCursoNomeAbreviado");
    mapField(query, "filter.curso.campus.id", dto, "filterCursoCampusId");
    mapField(query, "filter.curso.ofertaFormacao.id", dto, "filterCursoOfertaFormacaoId");
    mapField(query, "filter.curso.ofertaFormacao.nome", dto, "filterCursoOfertaFormacaoNome");
    mapField(query, "filter.curso.ofertaFormacao.slug", dto, "filterCursoOfertaFormacaoSlug");
  },
);

export function toListInput(dto: TurmaListInputGraphQlDto | null): TurmaListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<TurmaCreateInputGraphQlDto, TurmaCreateCommand>(
  (dto) => ({
    periodo: dto.periodo,
    curso: { id: dto.curso.id },
    ambientePadraoAula: dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null,
    imagemCapa: dto.imagemCapa ? { id: dto.imagemCapa.id } : null,
  }),
);

export const toUpdateInput = createMapper<
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
  imagemCapa:
    dto.imagemCapa !== undefined ? (dto.imagemCapa ? { id: dto.imagemCapa.id } : null) : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<TurmaFindOneQueryResult, TurmaFindOneOutputGraphQlDto>(
  (output) => ({
    id: output.id,
    periodo: output.periodo,
    curso: CursoGraphqlMapper.toFindOneOutput.map(output.curso),
    ambientePadraoAula: output.ambientePadraoAula
      ? AmbienteGraphqlMapper.toFindOneOutput.map(output.ambientePadraoAula)
      : null,
    imagemCapa: mapImagemOutput(output.imagemCapa),
    dateCreated: new Date(output.dateCreated),
    dateUpdated: new Date(output.dateUpdated),
    dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
  }),
);

export const toListOutput = createListMapper(TurmaListOutputGraphQlDto, toFindOneOutput);
