import {
  CidadeFindOneQuery,
  type CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import * as EstadoRestMapper from "@/modules/localidades/estado/presentation.rest/estado.rest.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  type CidadeListInputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CidadeFindOneInputRestDto,
  CidadeFindOneQuery
>((dto) => {
  const input = new CidadeFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CidadeListInputRestDto,
  CidadeListQuery
>(CidadeListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
  mapField(query, "filter.estado.id", dto, "filter.estado.id");
  mapField(query, "filter.estado.nome", dto, "filter.estado.nome");
  mapField(query, "filter.estado.sigla", dto, "filter.estado.sigla");
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CidadeFindOneQueryResult,
  CidadeFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  estado: EstadoRestMapper.findOneQueryResultToOutputDto.map(output.estado),
}));

export const listQueryResultToListOutputDto = createListMapper(
  CidadeListOutputRestDto,
  findOneQueryResultToOutputDto,
);
