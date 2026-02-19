import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilSetVinculosInputDto,
} from "@/modules/@acesso/perfil";
import { UsuarioRestMapper } from "@/modules/@acesso/usuario/presentation/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { CampusRestMapper } from "@/modules/ambientes/campus/presentation/rest";
import {
  PerfilFindOneOutputRestDto,
  PerfilListOutputRestDto,
  PerfilSetVinculosInputRestDto,
} from "./perfil.rest.dto";

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
