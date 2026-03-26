import {
  CidadeFindOneQuery,
  type CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import * as EstadoGraphqlMapper from "@/modules/localidades/estado/presentation.graphql/estado.graphql.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  CidadeFindOneOutputGraphQlDto,
  type CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<number, CidadeFindOneQuery>((id) => {
  const input = new CidadeFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<CidadeListInputGraphQlDto, CidadeListQuery>(
  CidadeListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");

    into(query).field("filter.estado.id").from(dto, "filterEstadoId");

    into(query).field("filter.estado.nome").from(dto, "filterEstadoNome");

    into(query).field("filter.estado.sigla").from(dto, "filterEstadoSigla");
  },
);

export function listInputDtoToListQuery(
  dto: CidadeListInputGraphQlDto | null,
): CidadeListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CidadeFindOneQueryResult,
  CidadeFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  estado: EstadoGraphqlMapper.findOneQueryResultToOutputDto.map(output.estado),
}));

export const listQueryResultToListOutputDto = createListMapper(
  CidadeListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
