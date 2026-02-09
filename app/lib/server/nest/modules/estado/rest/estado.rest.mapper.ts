import {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/modules/estado";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  EstadoFindOneInputRestDto,
  EstadoFindOneOutputRestDto,
  EstadoListInputRestDto,
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

  static toListInput(dto: EstadoListInputRestDto | null): EstadoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new EstadoListInputDto();
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

  static toFindOneOutputDto(output: EstadoFindOneOutputDto): EstadoFindOneOutputRestDto {
    const dto = new EstadoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto(output: EstadoListOutputDto): EstadoListOutputRestDto {
    const dto = new EstadoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
