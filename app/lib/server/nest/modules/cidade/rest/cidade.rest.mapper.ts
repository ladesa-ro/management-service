import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/modules/base/localidades/cidade";
import { EstadoRestMapper } from "@/server/nest/modules/estado/rest/estado.rest.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListInputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";

export class CidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CidadeFindOneInputRestDto): CidadeFindOneInputDto {
    const input = new CidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CidadeListInputRestDto | null): CidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CidadeListInputDto();
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

  static toFindOneOutputDto(output: CidadeFindOneOutputDto): CidadeFindOneOutputRestDto {
    const dto = new CidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoRestMapper.toFindOneOutputDto(output.estado);
    return dto;
  }

  static toListOutputDto(output: CidadeListOutputDto): CidadeListOutputRestDto {
    const dto = new CidadeListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
