import {
  AmbienteCreateCommand,
  AmbienteFindOneQuery,
  type AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteUpdateCommand,
} from "@/modules/ambientes/ambiente";
import * as BlocoGraphqlMapper from "@/modules/ambientes/bloco/presentation.graphql/bloco.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  into,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  type AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  type AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, AmbienteFindOneQuery>((id) => {
  const input = new AmbienteFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<AmbienteListInputGraphQlDto, AmbienteListQuery>(
  AmbienteListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");

    into(query).field("filter.bloco.id").from(dto, "filterBlocoId");

    into(query).field("filter.bloco.campus.id").from(dto, "filterBlocoCampusId");
  },
);

export function listInputDtoToListQuery(
  dto: AmbienteListInputGraphQlDto | null,
): AmbienteListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  AmbienteCreateInputGraphQlDto,
  AmbienteCreateCommand
>((dto) => ({
  nome: dto.nome,
  descricao: dto.descricao ?? null,
  codigo: dto.codigo,
  capacidade: dto.capacidade ?? null,
  tipo: dto.tipo ?? null,
  bloco: { id: dto.bloco.id },
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: AmbienteUpdateInputGraphQlDto },
  AmbienteFindOneQuery & AmbienteUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  descricao: dto.descricao !== undefined ? (dto.descricao ?? null) : undefined,
  codigo: dto.codigo,
  capacidade: dto.capacidade !== undefined ? (dto.capacidade ?? null) : undefined,
  tipo: dto.tipo !== undefined ? (dto.tipo ?? null) : undefined,
  bloco: dto.bloco ? { id: dto.bloco.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  AmbienteFindOneQueryResult,
  AmbienteFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  descricao: output.descricao,
  codigo: output.codigo,
  capacidade: output.capacidade,
  tipo: output.tipo,
  bloco: BlocoGraphqlMapper.findOneQueryResultToOutputDto.map(output.bloco),
  imagemCapa: mapImagemOutput(output.imagemCapa),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  AmbienteListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
