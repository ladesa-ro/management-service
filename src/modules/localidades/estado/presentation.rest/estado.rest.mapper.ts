import {
  EstadoFindOneQuery,
  type EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  type EstadoListInputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  EstadoFindOneInputRestDto,
  EstadoFindOneQuery
>((dto) => {
  const query = new EstadoFindOneQuery();
  query.id = dto.id;
  return query;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  EstadoListInputRestDto,
  EstadoListQuery
>(EstadoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EstadoFindOneQueryResult,
  EstadoFindOneOutputRestDto
>((queryResult) => ({
  id: queryResult.id,
  nome: queryResult.nome,
  sigla: queryResult.sigla,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EstadoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
