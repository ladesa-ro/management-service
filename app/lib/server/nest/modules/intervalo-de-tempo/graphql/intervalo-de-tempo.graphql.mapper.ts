import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/modules/sisgha/intervalo-de-tempo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
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
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: IntervaloDeTempoListOutputDto,
  ): IntervaloDeTempoListOutputGraphQlDto {
    const dto = new IntervaloDeTempoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
