import {
  CidadeFindOneQuery,
  type CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import * as EstadoGraphqlMapper from "@/modules/localidades/estado/presentation.graphql/estado.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  CidadeFindOneOutputGraphQlDto,
  type CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<number, CidadeFindOneQuery>((id) => {
  const input = new CidadeFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<CidadeListInputGraphQlDto, CidadeListQuery>(
  CidadeListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.estado.id", dto, "filterEstadoId");
    mapField(query, "filter.estado.nome", dto, "filterEstadoNome");
    mapField(query, "filter.estado.sigla", dto, "filterEstadoSigla");
  },
);

export function toListInput(dto: CidadeListInputGraphQlDto | null): CidadeListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  CidadeFindOneQueryResult,
  CidadeFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  estado: EstadoGraphqlMapper.toFindOneOutput.map(output.estado),
}));

export const toListOutput = createListMapper(CidadeListOutputGraphQlDto, toFindOneOutput);
