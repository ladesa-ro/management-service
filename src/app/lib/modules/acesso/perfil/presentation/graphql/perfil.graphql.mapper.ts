import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilSetVinculosInputDto,
} from "@/modules/acesso/perfil";
import { UsuarioGraphqlMapper } from "@/modules/acesso/usuario/presentation/graphql/usuario.graphql.mapper";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.mapper";
import {
  PerfilFindOneOutputGraphQlDto,
  PerfilListInputGraphQlDto,
  PerfilListOutputGraphQlDto,
  PerfilSetVinculosInputGraphQlDto,
} from "./perfil.graphql.dto";

export class PerfilGraphqlMapper {
  static toListInput(dto: PerfilListInputGraphQlDto | null): PerfilListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new PerfilListInputDto();
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

  static toFindOneInput(id: string, selection?: string[]): PerfilFindOneInputDto {
    const input = new PerfilFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toSetVinculosInput(dto: PerfilSetVinculosInputGraphQlDto): PerfilSetVinculosInputDto {
    const input = new PerfilSetVinculosInputDto();
    input.cargos = dto.cargos;
    input.campus = { id: dto.campus.id };
    input.usuario = { id: dto.usuario.id };
    return input;
  }

  static toFindOneOutputDto(output: PerfilFindOneOutputDto): PerfilFindOneOutputGraphQlDto {
    const dto = new PerfilFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = output.cargo;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.usuario = UsuarioGraphqlMapper.toFindOneOutputDto(output.usuario);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    PerfilListOutputGraphQlDto,
    PerfilGraphqlMapper.toFindOneOutputDto,
  );
}
