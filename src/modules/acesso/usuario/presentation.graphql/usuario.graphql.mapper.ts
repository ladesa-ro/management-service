import {
  UsuarioCreateCommand,
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioUpdateCommand,
} from "@/modules/acesso/usuario";
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
  UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";

export class UsuarioGraphqlMapper {
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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    UsuarioListOutputGraphQlDto,
    UsuarioGraphqlMapper.toFindOneOutputDto,
  );
}
