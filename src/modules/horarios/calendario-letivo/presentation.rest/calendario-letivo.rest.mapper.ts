import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import {
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQuery,
  type CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoUpdateCommand,
} from "@/modules/horarios/calendario-letivo";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
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

export const toFindOneInput = createMapper<
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneQuery
>((dto) => {
  const input = new CalendarioLetivoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<
  CalendarioLetivoListInputRestDto,
  CalendarioLetivoListQuery
>(CalendarioLetivoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
  mapField(query, "filter.ano", dto, "filter.ano");
  mapField(query, "filter.campus.id", dto, "filter.campus.id");
  mapField(query, "filter.ofertaFormacao.id", dto, "filter.ofertaFormacao.id");
});

export const toCreateInput = createMapper<
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

export const toUpdateInput = createMapper<
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

export const toFindOneOutput = createMapper<
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioLetivoFindOneOutputRestDto();
  dto.id = output.id;
  dto.nome = output.nome;
  dto.ano = output.ano;
  dto.campus = CampusRestMapper.toFindOneOutput.map(output.campus);
  dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutput.map(output.ofertaFormacao);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const toListOutput = createListMapper(CalendarioLetivoListOutputRestDto, toFindOneOutput);
