import { PerfilFindOneQuery, type PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil";
import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import { createMapper } from "@/shared/mapping";
import { PerfilFindOneOutputRestDto } from "./perfil.rest.dto";

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
  dto.campus = CampusRestMapper.findOneQueryResultToOutputDto.mapOptional(output.campus);
  dto.usuario = UsuarioRestMapper.findOneQueryResultToOutputDto.mapOptional(output.usuario);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});
