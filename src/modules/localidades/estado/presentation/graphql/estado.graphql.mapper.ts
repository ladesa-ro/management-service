import { createListOutputMapper } from "@/modules/@shared/application/mappers";
import {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";

export class EstadoGraphqlMapper {
  static toListInput(dto: EstadoListInputGraphQlDto | null): EstadoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new EstadoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: number, selection?: string[]): EstadoFindOneQuery {
    const input = new EstadoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: EstadoFindOneQueryResult): EstadoFindOneOutputGraphQlDto {
    const dto = new EstadoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EstadoListOutputGraphQlDto,
    EstadoGraphqlMapper.toFindOneOutputDto,
  );
}
