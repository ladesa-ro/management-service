import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/modules/base/localidades/estado";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";

export class EstadoGraphqlMapper {
  static toListInput(dto: EstadoListInputGraphQlDto | null): EstadoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new EstadoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: number, selection?: string[]): EstadoFindOneInputDto {
    const input = new EstadoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: EstadoFindOneOutputDto): EstadoFindOneOutputGraphQlDto {
    const dto = new EstadoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto(output: EstadoListOutputDto): EstadoListOutputGraphQlDto {
    const dto = new EstadoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
