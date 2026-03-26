import {
  EstadoFindOneQuery,
  type EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  type EstadoListInputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<EstadoFindOneInputRestDto, EstadoFindOneQuery>((dto) => {
  const input = new EstadoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<EstadoListInputRestDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
  },
);

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<EstadoFindOneQueryResult, EstadoFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    sigla: output.sigla,
  }),
);

export const toListOutput = createListMapper(EstadoListOutputRestDto, toFindOneOutput);
