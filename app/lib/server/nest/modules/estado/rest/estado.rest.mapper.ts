import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/modules/estado";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "./estado.rest.dto";

export class EstadoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: EstadoFindOneInputDto): EstadoFindOneInput {
    const input = new EstadoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: EstadoListInputDto | null): EstadoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new EstadoListInput();
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

  static toFindOneOutputDto(output: EstadoFindOneOutput): EstadoFindOneOutputDto {
    const dto = new EstadoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto(output: EstadoListOutput): EstadoListOutputDto {
    const dto = new EstadoListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
