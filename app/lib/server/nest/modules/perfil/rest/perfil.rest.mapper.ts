import {
  PerfilFindOneInput,
  PerfilFindOneOutput,
  PerfilListInput,
  PerfilListOutput,
  PerfilSetVinculosInput,
} from "@/modules/perfil";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import { UsuarioRestMapper } from "@/server/nest/modules/usuario/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilSetVinculosInputDto,
} from "./perfil.rest.dto";

export class PerfilRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: PerfilFindOneInputDto): PerfilFindOneInput {
    const input = new PerfilFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: PerfilListInputDto | null): PerfilListInput | null {
    if (!dto) {
      return null;
    }

    const input = new PerfilListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.ativo"] = dto["filter.ativo"];
    input["filter.cargo"] = dto["filter.cargo"];
    input["filter.campus.id"] = dto["filter.campus.id"];
    input["filter.usuario.id"] = dto["filter.usuario.id"];
    return input;
  }

  static toSetVinculosInput(dto: PerfilSetVinculosInputDto): PerfilSetVinculosInput {
    const input = new PerfilSetVinculosInput();
    input.cargos = dto.cargos;
    input.campus = { id: dto.campus.id };
    input.usuario = { id: dto.usuario.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: PerfilFindOneOutput): PerfilFindOneOutputDto {
    const dto = new PerfilFindOneOutputDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = output.cargo;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.usuario = UsuarioRestMapper.toFindOneOutputDto(output.usuario);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: PerfilListOutput): PerfilListOutputDto {
    const dto = new PerfilListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
