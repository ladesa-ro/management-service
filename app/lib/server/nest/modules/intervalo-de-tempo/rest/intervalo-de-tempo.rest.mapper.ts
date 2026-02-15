import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/modules/sisgha/intervalo-de-tempo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
  IntervaloDeTempoListInputRestDto,
  IntervaloDeTempoListOutputRestDto,
} from "./intervalo-de-tempo.rest.dto";

export class IntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: IntervaloDeTempoFindOneInputRestDto): IntervaloDeTempoFindOneInputDto {
    const input = new IntervaloDeTempoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: IntervaloDeTempoListInputRestDto | null,
  ): IntervaloDeTempoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new IntervaloDeTempoListInputDto();
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
    output: IntervaloDeTempoFindOneOutputDto,
  ): IntervaloDeTempoFindOneOutputRestDto {
    const dto = new IntervaloDeTempoFindOneOutputRestDto();
    dto.id = output.id;
    dto.periodoInicio = output.periodoInicio;
    dto.periodoFim = output.periodoFim;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: IntervaloDeTempoListOutputDto): IntervaloDeTempoListOutputRestDto {
    const dto = new IntervaloDeTempoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
