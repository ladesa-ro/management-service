import {
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/modules/intervalo-de-tempo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { IntervaloDeTempoFindOneOutputDto } from "../rest/intervalo-de-tempo.rest.dto";
import {
  IntervaloDeTempoListInputGqlDto,
  IntervaloDeTempoListOutputGqlDto,
} from "./intervalo-de-tempo.graphql.dto";

export class IntervaloDeTempoGraphqlMapper {
  static toListInput(
    dto: IntervaloDeTempoListInputGqlDto | null,
  ): IntervaloDeTempoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new IntervaloDeTempoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): IntervaloDeTempoFindOneInput {
    const input = new IntervaloDeTempoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(
    output: IntervaloDeTempoFindOneOutput,
  ): IntervaloDeTempoFindOneOutputDto {
    return output as unknown as IntervaloDeTempoFindOneOutputDto;
  }

  static toListOutputDto(output: IntervaloDeTempoListOutput): IntervaloDeTempoListOutputGqlDto {
    const dto = new IntervaloDeTempoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
