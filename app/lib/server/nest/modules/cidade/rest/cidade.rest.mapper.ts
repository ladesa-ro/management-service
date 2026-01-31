import {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/modules/cidade";
import { EstadoRestMapper } from "@/server/nest/modules/estado/rest/estado.rest.mapper";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "./cidade.rest.dto";

export class CidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CidadeFindOneInputDto): CidadeFindOneInput {
    const input = new CidadeFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CidadeListInputDto | null): CidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.estado.id"] = dto["filter.estado.id"];
    input["filter.estado.nome"] = dto["filter.estado.nome"];
    input["filter.estado.sigla"] = dto["filter.estado.sigla"];
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CidadeFindOneOutput): CidadeFindOneOutputDto {
    const dto = new CidadeFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoRestMapper.toFindOneOutputDto(output.estado);
    return dto;
  }

  static toListOutputDto(output: CidadeListOutput): CidadeListOutputDto {
    const dto = new CidadeListOutputDto();
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
