import {
  UsuarioCreateCommand,
  UsuarioFindOneQuery,
  type UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioUpdateCommand,
} from "@/modules/acesso/usuario";
import type { PerfilNestedQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-nested.query.result";
import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  into,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  type UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioPerfilNestedOutputGraphQlDto,
  type UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, UsuarioFindOneQuery>((id) => {
  const input = new UsuarioFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<UsuarioListInputGraphQlDto, UsuarioListQuery>(
  UsuarioListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");
  },
);

export function listInputDtoToListQuery(
  dto: UsuarioListInputGraphQlDto | null,
): UsuarioListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  UsuarioCreateInputGraphQlDto,
  UsuarioCreateCommand
>((dto) => {
  const input = new UsuarioCreateCommand();
  input.nome = dto.nome;
  input.matricula = dto.matricula;
  input.email = dto.email;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: UsuarioUpdateInputGraphQlDto },
  UsuarioFindOneQuery & UsuarioUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  matricula: dto.matricula,
  email: dto.email,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

function getCargoNome(output: PerfilNestedQueryResult): string {
  return output.cargo?.nome ?? "";
}

export function toPerfilNestedOutputDto(
  output: PerfilNestedQueryResult,
): UsuarioPerfilNestedOutputGraphQlDto {
  const dto = new UsuarioPerfilNestedOutputGraphQlDto();
  dto.id = output.id;
  dto.ativo = output.ativo;
  dto.cargo = getCargoNome(output);
  dto.campus = CampusGraphqlMapper.findOneQueryResultToOutputDto.map(output.campus);
  dto.dateCreated = new Date(output.dateCreated);
  dto.dateUpdated = new Date(output.dateUpdated);
  dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
  return dto;
}

export const findOneQueryResultToOutputDto = createMapper<
  UsuarioFindOneQueryResult,
  UsuarioFindOneOutputGraphQlDto
>((output) => {
  const dto = new UsuarioFindOneOutputGraphQlDto();
  dto.id = output.id;
  dto.nome = output.nome;
  dto.matricula = output.matricula;
  dto.email = output.email;
  dto.isSuperUser = output.isSuperUser;
  dto.imagemCapa = mapImagemOutput(output.imagemCapa);
  dto.imagemPerfil = mapImagemOutput(output.imagemPerfil);
  dto.vinculos = (output.vinculos ?? []).map(toPerfilNestedOutputDto);
  dto.dateCreated = new Date(output.dateCreated);
  dto.dateUpdated = new Date(output.dateUpdated);
  dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  UsuarioListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
