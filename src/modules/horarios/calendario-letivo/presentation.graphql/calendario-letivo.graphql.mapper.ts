import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import * as OfertaFormacaoGraphqlMapper from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.mapper";
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
  type CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  type CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  type CalendarioLetivoUpdateInputGraphQlDto,
} from "./calendario-letivo.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<string, CalendarioLetivoFindOneQuery>((id) => {
  const input = new CalendarioLetivoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListQuery
>(CalendarioLetivoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filterId");
  mapField(query, "filter.campus.id", dto, "filterCampusId");
  mapField(query, "filter.ofertaFormacao.id", dto, "filterOfertaFormacaoId");
});

export function toListInput(
  dto: CalendarioLetivoListInputGraphQlDto | null,
): CalendarioLetivoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<
  CalendarioLetivoCreateInputGraphQlDto,
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
  { id: string; dto: CalendarioLetivoUpdateInputGraphQlDto },
  CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand
>(({ id, dto }) => ({
  id,
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
  CalendarioLetivoFindOneOutputGraphQlDto
>((output) => {
  const dto = new CalendarioLetivoFindOneOutputGraphQlDto();
  dto.id = output.id;
  dto.nome = output.nome;
  dto.ano = output.ano;
  dto.campus = CampusGraphqlMapper.toFindOneOutput.map(output.campus);
  dto.ofertaFormacao = OfertaFormacaoGraphqlMapper.toFindOneOutput.map(output.ofertaFormacao);
  dto.dateCreated = new Date(output.dateCreated);
  dto.dateUpdated = new Date(output.dateUpdated);
  dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
  return dto;
});

export const toListOutput = createListMapper(CalendarioLetivoListOutputGraphQlDto, toFindOneOutput);
