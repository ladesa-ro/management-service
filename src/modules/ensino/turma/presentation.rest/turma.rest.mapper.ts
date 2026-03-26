import * as AmbienteRestMapper from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.mapper";
import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import * as CursoRestMapper from "@/modules/ensino/curso/presentation.rest/curso.rest.mapper";
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
} from "@/shared/mapping";
import {
  type TurmaCreateInputRestDto,
  type TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
  type TurmaListInputRestDto,
  TurmaListOutputRestDto,
  type TurmaUpdateInputRestDto,
} from "./turma.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  TurmaFindOneInputRestDto,
  TurmaFindOneQuery
>((dto) => {
  const input = new TurmaFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  TurmaListInputRestDto,
  TurmaListQuery
>(TurmaListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
  mapField(query, "filter.periodo", dto, "filter.periodo");
  mapField(query, "filter.ambientePadraoAula.nome", dto, "filter.ambientePadraoAula.nome");
  mapField(query, "filter.ambientePadraoAula.codigo", dto, "filter.ambientePadraoAula.codigo");
  mapField(
    query,
    "filter.ambientePadraoAula.capacidade",
    dto,
    "filter.ambientePadraoAula.capacidade",
  );
  mapField(query, "filter.ambientePadraoAula.tipo", dto, "filter.ambientePadraoAula.tipo");
  mapField(query, "filter.curso.id", dto, "filter.curso.id");
  mapField(query, "filter.curso.nome", dto, "filter.curso.nome");
  mapField(query, "filter.curso.nomeAbreviado", dto, "filter.curso.nomeAbreviado");
  mapField(query, "filter.curso.campus.id", dto, "filter.curso.campus.id");
  mapField(query, "filter.curso.ofertaFormacao.id", dto, "filter.curso.ofertaFormacao.id");
  mapField(query, "filter.curso.ofertaFormacao.nome", dto, "filter.curso.ofertaFormacao.nome");
  mapField(query, "filter.curso.ofertaFormacao.slug", dto, "filter.curso.ofertaFormacao.slug");
});

export const createInputDtoToCreateCommand = createMapper<
  TurmaCreateInputRestDto,
  TurmaCreateCommand
>((dto) => ({
  periodo: dto.periodo,
  nome: dto.nome ?? null,
  curso: { id: dto.curso.id },
  ambientePadraoAula: dto.ambientePadraoAula ? { id: dto.ambientePadraoAula.id } : null,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { params: TurmaFindOneInputRestDto; dto: TurmaUpdateInputRestDto },
  TurmaFindOneQuery & TurmaUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  periodo: dto.periodo,
  nome: dto.nome !== undefined ? (dto.nome ?? null) : undefined,
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
  TurmaFindOneOutputRestDto
>((output) => ({
  id: output.id,
  periodo: output.periodo,
  nome: output.nome ?? null,
  curso: CursoRestMapper.findOneQueryResultToOutputDto.map(output.curso),
  ambientePadraoAula: output.ambientePadraoAula
    ? AmbienteRestMapper.findOneQueryResultToOutputDto.map(output.ambientePadraoAula)
    : null,
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  TurmaListOutputRestDto,
  findOneQueryResultToOutputDto,
);
