import {
  UsuarioCreateCommand,
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioUpdateCommand,
} from "@/modules/acesso/usuario";
import type { PerfilNestedQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-nested.query.result";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioPerfilNestedOutputGraphQlDto,
  UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";

export class UsuarioGraphqlMapper {
  private static getCargoNome(output: PerfilNestedQueryResult): string {
    return output.cargo?.nome ?? "";
  }

  static toListInput(dto: UsuarioListInputGraphQlDto | null): UsuarioListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new UsuarioListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput = createFindOneInputMapper(UsuarioFindOneQuery);

  static toCreateInput(dto: UsuarioCreateInputGraphQlDto): UsuarioCreateCommand {
    const input = new UsuarioCreateCommand();
    input.nome = dto.nome;
    input.matricula = dto.matricula;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: UsuarioUpdateInputGraphQlDto,
  ): UsuarioFindOneQuery & UsuarioUpdateCommand {
    const input = new UsuarioFindOneQuery() as UsuarioFindOneQuery & UsuarioUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.matricula !== undefined) {
      input.matricula = dto.matricula;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    return input;
  }

  static toFindOneOutputDto(output: UsuarioFindOneQueryResult): UsuarioFindOneOutputGraphQlDto {
    const dto = new UsuarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.matricula = output.matricula;
    dto.email = output.email;
    dto.isSuperUser = output.isSuperUser;
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    dto.imagemPerfil = mapImagemOutput(output.imagemPerfil);
    dto.vinculos = (output.vinculos ?? []).map(UsuarioGraphqlMapper.toPerfilNestedOutputDto);
    mapDatedFields(dto, output);
    return dto;
  }

  static toPerfilNestedOutputDto(
    output: PerfilNestedQueryResult,
  ): UsuarioPerfilNestedOutputGraphQlDto {
    const dto = new UsuarioPerfilNestedOutputGraphQlDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = UsuarioGraphqlMapper.getCargoNome(output);
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    UsuarioListOutputGraphQlDto,
    UsuarioGraphqlMapper.toFindOneOutputDto,
  );
}
