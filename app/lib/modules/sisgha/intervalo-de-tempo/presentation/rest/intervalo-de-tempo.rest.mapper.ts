import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
} from "@/modules/sisgha/intervalo-de-tempo";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  IntervaloDeTempoFindOneOutputRestDto,
  IntervaloDeTempoListOutputRestDto,
} from "./intervalo-de-tempo.rest.dto";

export class IntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(IntervaloDeTempoFindOneInputDto);

  static toListInput = createListInputMapper(IntervaloDeTempoListInputDto, ["filter.id"]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    IntervaloDeTempoListOutputRestDto,
    IntervaloDeTempoRestMapper.toFindOneOutputDto,
  );
}
