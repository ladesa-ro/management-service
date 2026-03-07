import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilSetVinculosInputDto,
} from "@/Ladesa.Management.Application/acesso/perfil";
import {
  PerfilFindOneOutputRestDto,
  PerfilListOutputRestDto,
  PerfilSetVinculosInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/PerfilRestDto";
import { CampusRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/CampusRestMapper";
import { UsuarioRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/UsuarioRestMapper";

export class PerfilRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(PerfilFindOneInputDto);

  static toListInput = createListInputMapper(PerfilListInputDto, [
    "filter.id",
    "filter.ativo",
    "filter.cargo",
    "filter.campus.id",
    "filter.usuario.id",
  ]);

  static toSetVinculosInput(dto: PerfilSetVinculosInputRestDto): PerfilSetVinculosInputDto {
    const input = new PerfilSetVinculosInputDto();
    input.cargos = dto.cargos;
    input.campus = { id: dto.campus.id };
    input.usuario = { id: dto.usuario.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: PerfilFindOneOutputDto): PerfilFindOneOutputRestDto {
    const dto = new PerfilFindOneOutputRestDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = output.cargo;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.usuario = UsuarioRestMapper.toFindOneOutputDto(output.usuario);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    PerfilListOutputRestDto,
    PerfilRestMapper.toFindOneOutputDto,
  );
}
