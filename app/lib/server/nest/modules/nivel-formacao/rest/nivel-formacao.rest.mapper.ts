import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/modules/ensino/nivel-formacao";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";

export class NivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: NivelFormacaoFindOneInputRestDto): NivelFormacaoFindOneInputDto {
    const input = new NivelFormacaoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: NivelFormacaoListInputRestDto | null): NivelFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new NivelFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: NivelFormacaoCreateInputRestDto): NivelFormacaoCreateInputDto {
    const input = new NivelFormacaoCreateInputDto();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(dto: NivelFormacaoUpdateInputRestDto): NivelFormacaoUpdateInputDto {
    const input = new NivelFormacaoUpdateInputDto();
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: NivelFormacaoFindOneOutputDto,
  ): NivelFormacaoFindOneOutputRestDto {
    const dto = new NivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.slug = output.slug;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: NivelFormacaoListOutputDto): NivelFormacaoListOutputRestDto {
    const dto = new NivelFormacaoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
