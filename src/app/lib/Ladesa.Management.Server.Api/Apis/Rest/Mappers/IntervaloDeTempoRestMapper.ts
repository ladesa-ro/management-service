import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoListInputDto,
} from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import {
  IntervaloDeTempoFindOneOutputRestDto,
  IntervaloDeTempoListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/IntervaloDeTempoRestDto";

export class IntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(IntervaloDeTempoFindOneInputDto);

  static toListInput = createListInputMapper(IntervaloDeTempoListInputDto, ["filter.id"]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================
  static toListOutputDto = createListOutputMapper(
    IntervaloDeTempoListOutputRestDto,
    IntervaloDeTempoRestMapper.toFindOneOutputDto,
  );

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
}
