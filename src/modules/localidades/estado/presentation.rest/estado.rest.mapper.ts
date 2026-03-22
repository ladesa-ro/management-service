import {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import { createListInputMapper, createListOutputMapper } from "@/shared/mapping";
import { createMapping } from "@/shared/mapping/index";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListOutputRestDto,
} from "./estado.rest.dto";

const outputMapping = createMapping(["id", "nome", "sigla"]);

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
    return outputMapping.map<EstadoFindOneOutputRestDto>(output);
  }

  static toListOutputDto = createListOutputMapper(
    EstadoListOutputRestDto,
    EstadoRestMapper.toFindOneOutputDto,
  );
}
