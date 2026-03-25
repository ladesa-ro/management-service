import { PerfilFindOneQuery, PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil";
import { UsuarioRestMapper } from "@/modules/acesso/usuario/presentation.rest";
import { CampusRestMapper } from "@/modules/ambientes/campus/presentation.rest";
import { createFindOneInputMapper, mapDatedFields } from "@/shared/mapping";
import { PerfilFindOneOutputRestDto } from "./perfil.rest.dto";

export class PerfilRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(PerfilFindOneQuery);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: PerfilFindOneQueryResult): PerfilFindOneOutputRestDto {
    const dto = new PerfilFindOneOutputRestDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = output.cargo;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.usuario = UsuarioRestMapper.toFindOneOutputDto(output.usuario);
    mapDatedFields(dto, output);
    return dto;
  }
}
