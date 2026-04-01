import {
  PerfilFindOneQuery,
  type PerfilFindOneQueryResult,
  PerfilListQuery,
} from "@/modules/acesso/usuario/perfil";
import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  PerfilFindOneOutputRestDto,
  type PerfilListInputRestDto,
  PerfilListOutputRestDto,
} from "./perfil.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<{ id: string }, PerfilFindOneQuery>(
  (dto) => {
    const input = new PerfilFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const listInputDtoToListQuery = createPaginatedInputMapper<
  PerfilListInputRestDto,
  PerfilListQuery
>(PerfilListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.campus.id").from(dto);
  into(query).field("filter.usuario.id").from(dto);
  into(query).field("filter.cargo.nome").from(dto);
});

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

function getCargoNome(output: PerfilFindOneQueryResult): string {
  return output.cargo?.nome ?? "";
}

export const findOneQueryResultToOutputDto = createMapper<
  PerfilFindOneQueryResult,
  PerfilFindOneOutputRestDto
>((output) => {
  const dto = new PerfilFindOneOutputRestDto();
  dto.id = output.id;
  dto.ativo = output.ativo;
  dto.cargo = getCargoNome(output);
  dto.campus = CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus);
  dto.usuario = UsuarioRestMapper.findOneQueryResultToOutputDto.map(output.usuario);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  PerfilListOutputRestDto,
  findOneQueryResultToOutputDto,
);
