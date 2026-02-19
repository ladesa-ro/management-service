import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
} from "@/modules/horarios/intervalo-de-tempo";
import {
  IntervaloDeTempoFindOneOutputGraphQlDto,
  IntervaloDeTempoListInputGraphQlDto,
  IntervaloDeTempoListOutputGraphQlDto,
} from "./intervalo-de-tempo.graphql.dto";

export class IntervaloDeTempoGraphqlMapper {
  static toListInput(
    dto: IntervaloDeTempoListInputGraphQlDto | null,
  ): IntervaloDeTempoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new IntervaloDeTempoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): IntervaloDeTempoFindOneInputDto {
    const input = new IntervaloDeTempoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(
    output: IntervaloDeTempoFindOneOutputDto,
  ): IntervaloDeTempoFindOneOutputGraphQlDto {
    const dto = new IntervaloDeTempoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.periodoInicio = output.periodoInicio;
    dto.periodoFim = output.periodoFim;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    IntervaloDeTempoListOutputGraphQlDto,
    IntervaloDeTempoGraphqlMapper.toFindOneOutputDto,
  );
}
