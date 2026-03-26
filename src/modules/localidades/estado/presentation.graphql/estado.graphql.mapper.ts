import {
  EstadoFindOneQuery,
  type EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  EstadoFindOneOutputGraphQlDto,
  type EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<number, EstadoFindOneQuery>((id) => {
  const query = new EstadoFindOneQuery();
  query.id = id;
  return query;
});

export function listInputDtoToListQuery(
  dto: EstadoListInputGraphQlDto | null,
): EstadoListQuery | null {
  if (!dto) return null;
  return createPaginatedInputMapper<EstadoListInputGraphQlDto, EstadoListQuery>(
    EstadoListQuery,
    (source, query) => {
      into(query).field("filter.id").from(source, "filterId");
    },
  ).map(dto);
}

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EstadoFindOneQueryResult,
  EstadoFindOneOutputGraphQlDto
>((queryResult) => ({
  id: queryResult.id,
  nome: queryResult.nome,
  sigla: queryResult.sigla,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EstadoListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
