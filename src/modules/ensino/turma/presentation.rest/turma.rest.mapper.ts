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
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
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
  into(query).field("filter.id").from(dto);
  into(query).field("filter.periodo").from(dto);
  into(query).field("filter.ambientePadraoAula.nome").from(dto);
  into(query)
    .field("filter.ambientePadraoAula.codigo")
    .from(dto, "filter.ambientePadraoAula.codigo");
  into(query)
    .field("filter.ambientePadraoAula.capacidade")
    .from(dto, "filter.ambientePadraoAula.capacidade");
  into(query).field("filter.ambientePadraoAula.tipo").from(dto);
  into(query).field("filter.curso.id").from(dto);
  into(query).field("filter.curso.nome").from(dto);
  into(query).field("filter.curso.nomeAbreviado").from(dto);
  into(query).field("filter.curso.campus.id").from(dto);
  into(query).field("filter.curso.ofertaFormacao.id").from(dto);
  into(query)
    .field("filter.curso.ofertaFormacao.nome")
    .from(dto, "filter.curso.ofertaFormacao.nome");
  into(query)
    .field("filter.curso.ofertaFormacao.slug")
    .from(dto, "filter.curso.ofertaFormacao.slug");
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
  ambientePadraoAula: AmbienteRestMapper.findOneQueryResultToOutputDto.mapOptional(
    output.ambientePadraoAula,
  ),
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  TurmaListOutputRestDto,
  findOneQueryResultToOutputDto,
);
