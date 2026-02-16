import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
} from "@/modules/@base/localidades/estado";
import {
  createListInputMapper,
  createListOutputMapper,
} from "@/modules/@shared/application/mappers";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";

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
