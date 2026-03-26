import {
  AmbienteCreateCommand,
  AmbienteFindOneQuery,
  type AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteUpdateCommand,
} from "@/modules/ambientes/ambiente";
import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type AmbienteCreateInputRestDto,
  type AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  type AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  type AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  AmbienteFindOneInputRestDto,
  AmbienteFindOneQuery
>((dto) => {
  const input = new AmbienteFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  AmbienteListInputRestDto,
  AmbienteListQuery
>(AmbienteListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.bloco.id").from(dto);
  into(query).field("filter.bloco.campus.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  AmbienteCreateInputRestDto,
  AmbienteCreateCommand
>((dto) => ({
  nome: dto.nome,
  codigo: dto.codigo,
  descricao: dto.descricao,
  capacidade: dto.capacidade,
  tipo: dto.tipo,
  bloco: { id: dto.bloco.id },
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { params: AmbienteFindOneInputRestDto; dto: AmbienteUpdateInputRestDto },
  AmbienteFindOneQuery & AmbienteUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  codigo: dto.codigo,
  descricao: dto.descricao,
  capacidade: dto.capacidade,
  tipo: dto.tipo,
  bloco: dto.bloco ? { id: dto.bloco.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  AmbienteFindOneQueryResult,
  AmbienteFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  descricao: output.descricao,
  codigo: output.codigo,
  capacidade: output.capacidade,
  tipo: output.tipo,
  bloco: BlocoRestMapper.findOneQueryResultToOutputDto.map(output.bloco),
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  AmbienteListOutputRestDto,
  findOneQueryResultToOutputDto,
);
