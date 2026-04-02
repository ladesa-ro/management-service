import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import {
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQuery,
  type CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoUpdateCommand,
} from "@/modules/calendario/letivo";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type CalendarioLetivoCreateInputRestDto,
  type CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
  type CalendarioLetivoListInputRestDto,
  CalendarioLetivoListOutputRestDto,
  type CalendarioLetivoUpdateInputRestDto,
} from "./calendario-letivo.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneQuery
>((dto) => {
  const input = new CalendarioLetivoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioLetivoListInputRestDto,
  CalendarioLetivoListQuery
>(CalendarioLetivoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.ano").from(dto);
  into(query).field("filter.campus.id").from(dto);
  into(query).field("filter.ofertaFormacao.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  CalendarioLetivoCreateInputRestDto,
  CalendarioLetivoCreateCommand
>((dto) => {
  const input = new CalendarioLetivoCreateCommand();
  input.nome = dto.nome;
  input.ano = dto.ano;
  input.campus = { id: dto.campus.id };
  input.ofertaFormacao = { id: dto.ofertaFormacao.id };
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: CalendarioLetivoFindOneInputRestDto; dto: CalendarioLetivoUpdateInputRestDto },
  CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  ano: dto.ano,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioLetivoFindOneOutputRestDto();
  dto.id = output.id;
  dto.nome = output.nome;
  dto.ano = output.ano;
  dto.campus = CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus);
  dto.ofertaFormacao = OfertaFormacaoRestMapper.findOneQueryResultToOutputDto.map(
    output.ofertaFormacao,
  );
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioLetivoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
