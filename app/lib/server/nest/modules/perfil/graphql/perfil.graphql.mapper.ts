import {
  PerfilFindOneInput,
  PerfilFindOneOutput,
  PerfilListInput,
  PerfilListOutput,
  PerfilSetVinculosInput,
} from "@/modules/perfil";
import { CampusFindOneOutputDto } from "@/server/nest/modules/campus/rest";
import { UsuarioFindOneOutputDto } from "@/server/nest/modules/usuario/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { PerfilFindOneOutputDto, PerfilSetVinculosInputDto } from "../rest/perfil.rest.dto";
import { PerfilListInputGqlDto, PerfilListOutputGqlDto } from "./perfil.graphql.dto";

export class PerfilGraphqlMapper {
  static toListInput(dto: PerfilListInputGqlDto | null): PerfilListInput | null {
    if (!dto) {
      return null;
    }

    const input = new PerfilListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.ativo"] = dto.filterAtivo;
    input["filter.cargo"] = dto.filterCargo;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.usuario.id"] = dto.filterUsuarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): PerfilFindOneInput {
    const input = new PerfilFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toSetVinculosInput(dto: PerfilSetVinculosInputDto): PerfilSetVinculosInput {
    const input = new PerfilSetVinculosInput();
    input.cargos = dto.cargos;
    input.campus = { id: dto.campus.id };
    input.usuario = { id: dto.usuario.id };
    return input;
  }

  static toFindOneOutputDto(output: PerfilFindOneOutput): PerfilFindOneOutputDto {
    const dto = new PerfilFindOneOutputDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = output.cargo;
    dto.campus = output.campus as unknown as CampusFindOneOutputDto;
    dto.usuario = output.usuario as unknown as UsuarioFindOneOutputDto;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: PerfilListOutput): PerfilListOutputGqlDto {
    const dto = new PerfilListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
