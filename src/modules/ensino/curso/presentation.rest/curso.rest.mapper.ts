import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import {
  CursoCreateCommand,
  CursoFindOneQuery,
  type CursoFindOneQueryResult,
  CursoListQuery,
  CursoUpdateCommand,
} from "@/modules/ensino/curso";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type CursoCreateInputRestDto,
  type CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  type CursoListInputRestDto,
  CursoListOutputRestDto,
  type CursoUpdateInputRestDto,
} from "./curso.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CursoFindOneInputRestDto,
  CursoFindOneQuery
>((dto) => {
  const input = new CursoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CursoListInputRestDto,
  CursoListQuery
>(CursoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.campus.id").from(dto);
  into(query).field("filter.ofertaFormacao.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  CursoCreateInputRestDto,
  CursoCreateCommand
>((dto) => {
  const input = new CursoCreateCommand();
  input.nome = dto.nome;
  input.nomeAbreviado = dto.nomeAbreviado;
  input.quantidadePeriodos = dto.quantidadePeriodos;
  input.campus = { id: dto.campus.id };
  input.ofertaFormacao = { id: dto.ofertaFormacao.id };
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: CursoFindOneInputRestDto; dto: CursoUpdateInputRestDto },
  CursoFindOneQuery & CursoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  quantidadePeriodos: dto.quantidadePeriodos,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CursoFindOneQueryResult,
  CursoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  nomeAbreviado: output.nomeAbreviado,
  quantidadePeriodos: output.quantidadePeriodos,
  campus: CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus),
  ofertaFormacao: OfertaFormacaoRestMapper.findOneQueryResultToOutputDto.map(output.ofertaFormacao),
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  CursoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
