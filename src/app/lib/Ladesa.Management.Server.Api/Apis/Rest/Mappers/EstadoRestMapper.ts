import {
  createListInputMapper,
  createListOutputMapper,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
} from "@/Ladesa.Management.Application/localidades/estado";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/EstadoRestDto";

export class EstadoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: EstadoFindOneInputRestDto): EstadoFindOneInputDto {
    const input = new EstadoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput = createListInputMapper(EstadoListInputDto, ["filter.id"]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: EstadoFindOneOutputDto): EstadoFindOneOutputRestDto {
    const dto = new EstadoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EstadoListOutputRestDto,
    EstadoRestMapper.toFindOneOutputDto,
  );
}
