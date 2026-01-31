import {
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/core/intervalo-de-tempo";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "./intervalo-de-tempo.rest.dto";

export class IntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: IntervaloDeTempoFindOneInputDto): IntervaloDeTempoFindOneInput {
    const input = new IntervaloDeTempoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: IntervaloDeTempoListInputDto | null): IntervaloDeTempoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new IntervaloDeTempoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: IntervaloDeTempoFindOneOutput,
  ): IntervaloDeTempoFindOneOutputDto {
    const dto = new IntervaloDeTempoFindOneOutputDto();
    dto.id = output.id;
    dto.periodoInicio = output.periodoInicio;
    dto.periodoFim = output.periodoFim;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: IntervaloDeTempoListOutput): IntervaloDeTempoListOutputDto {
    const dto = new IntervaloDeTempoListOutputDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
