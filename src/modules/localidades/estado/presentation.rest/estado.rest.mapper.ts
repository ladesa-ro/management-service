import {
  createListInputMapper,
  createListOutputMapper,
} from "@/modules/@shared/application/mappers";
import {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";

export class EstadoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: EstadoFindOneInputRestDto): EstadoFindOneQuery {
    const input = new EstadoFindOneQuery();
    input.id = dto.id;
    return input;
  }

  static toListInput = createListInputMapper(EstadoListQuery, ["filter.id"]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: EstadoFindOneQueryResult): EstadoFindOneOutputRestDto {
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
