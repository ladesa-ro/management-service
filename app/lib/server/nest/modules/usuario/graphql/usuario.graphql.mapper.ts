import {
  UsuarioCreateInput,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
  UsuarioUpdateInput,
} from "@/modules/usuario";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  UsuarioCreateInputDto,
  UsuarioFindOneOutputDto,
  UsuarioUpdateInputDto,
} from "../rest/usuario.rest.dto";
import { UsuarioListInputGqlDto, UsuarioListOutputGqlDto } from "./usuario.graphql.dto";

export class UsuarioGraphqlMapper {
  static toListInput(dto: UsuarioListInputGqlDto | null): UsuarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new UsuarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): UsuarioFindOneInput {
    const input = new UsuarioFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: UsuarioCreateInputDto): UsuarioCreateInput {
    const input = new UsuarioCreateInput();
    input.nome = dto.nome;
    input.matriculaSiape = dto.matriculaSiape;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: UsuarioUpdateInputDto,
  ): UsuarioFindOneInput & UsuarioUpdateInput {
    const input = new UsuarioFindOneInput() as UsuarioFindOneInput & UsuarioUpdateInput;
    input.id = id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.matriculaSiape !== undefined) {
      input.matriculaSiape = dto.matriculaSiape;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    return input;
  }

  static toFindOneOutputDto(output: UsuarioFindOneOutput): UsuarioFindOneOutputDto {
    return output as unknown as UsuarioFindOneOutputDto;
  }

  static toListOutputDto(output: UsuarioListOutput): UsuarioListOutputGqlDto {
    const dto = new UsuarioListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
