import {
  EstadoFindOneQuery,
  type EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import { createListMapper, createMapper, createPaginatedInputMapper } from "@/shared/mapping";
import {
  EstadoFindOneOutputGraphQlDto,
  type EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

const listInputMapper = createPaginatedInputMapper<EstadoListInputGraphQlDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    if (dto.filterId !== undefined) query["filter.id"] = dto.filterId;
  },
);

export const toFindOneInput = createMapper<number, EstadoFindOneQuery>((id) => {
  const input = new EstadoFindOneQuery();
  input.id = id;
  return input;
});

export function toListInput(dto: EstadoListInputGraphQlDto | null): EstadoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  EstadoFindOneQueryResult,
  EstadoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  sigla: output.sigla,
}));

export const toListOutput = createListMapper(EstadoListOutputGraphQlDto, toFindOneOutput);
