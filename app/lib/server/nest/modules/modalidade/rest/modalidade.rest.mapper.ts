import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/modules/ensino/modalidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";

export class ModalidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: ModalidadeFindOneInputRestDto): ModalidadeFindOneInputDto {
    const input = new ModalidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: ModalidadeListInputRestDto | null): ModalidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ModalidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: ModalidadeCreateInputRestDto): ModalidadeCreateInputDto {
    const input = new ModalidadeCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: ModalidadeFindOneInputRestDto,
    dto: ModalidadeUpdateInputRestDto,
  ): ModalidadeFindOneInputDto & ModalidadeUpdateInputDto {
    const input = new ModalidadeFindOneInputDto() as ModalidadeFindOneInputDto &
      ModalidadeUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: ModalidadeFindOneOutputDto): ModalidadeFindOneOutputRestDto {
    const dto = new ModalidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: ModalidadeListOutputDto): ModalidadeListOutputRestDto {
    const dto = new ModalidadeListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
