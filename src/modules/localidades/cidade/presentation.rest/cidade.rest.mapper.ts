import {
  CidadeFindOneQuery,
  type CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import * as EstadoRestMapper from "@/modules/localidades/estado/presentation.rest/estado.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
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
  into(query).field("filter.id").from(dto);
  into(query).field("filter.estado.id").from(dto);
  into(query).field("filter.estado.nome").from(dto);
  into(query).field("filter.estado.sigla").from(dto);
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
