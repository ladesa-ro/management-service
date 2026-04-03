import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  CursoCreateCommand,
  CursoFindOneQuery,
  type CursoFindOneQueryResult,
  CursoListQuery,
  CursoUpdateCommand,
} from "@/modules/ensino/curso";
import * as OfertaFormacaoGraphqlMapper from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  into,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type CursoCreateInputGraphQlDto,
  CursoFindOneOutputGraphQlDto,
  type CursoListInputGraphQlDto,
  CursoListOutputGraphQlDto,
  type CursoUpdateInputGraphQlDto,
} from "./curso.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, CursoFindOneQuery>((id) => {
  const input = new CursoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<CursoListInputGraphQlDto, CursoListQuery>(
  CursoListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");

    into(query).field("filter.campus.id").from(dto, "filterCampusId");

    into(query).field("filter.ofertaFormacao.id").from(dto, "filterOfertaFormacaoId");
  },
);

export function listInputDtoToListQuery(
  dto: CursoListInputGraphQlDto | null,
): CursoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  CursoCreateInputGraphQlDto,
  CursoCreateCommand
>((dto) => {
  const input = new CursoCreateCommand();
  input.nome = dto.nome;
  input.nomeAbreviado = dto.nomeAbreviado;
  input.quantidadePeriodos = dto.quantidadePeriodos;
  input.campus = { id: dto.campus.id };
  input.ofertaFormacao = { id: dto.ofertaFormacao.id };
  input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: CursoUpdateInputGraphQlDto },
  CursoFindOneQuery & CursoUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  quantidadePeriodos: dto.quantidadePeriodos,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : undefined,
  imagemCapa:
    dto.imagemCapa !== undefined ? (dto.imagemCapa ? { id: dto.imagemCapa.id } : null) : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CursoFindOneQueryResult,
  CursoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  nomeAbreviado: output.nomeAbreviado,
  quantidadePeriodos: output.quantidadePeriodos,
  campus: CampusGraphqlMapper.findOneQueryResultToOutputDto.map(output.campus),
  ofertaFormacao: OfertaFormacaoGraphqlMapper.findOneQueryResultToOutputDto.map(
    output.ofertaFormacao,
  ),
  imagemCapa: mapImagemOutput(output.imagemCapa),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  CursoListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
