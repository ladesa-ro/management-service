import {
  ModalidadeCreateInput,
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
  ModalidadeUpdateInput,
} from "@/modules/modalidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "./modalidade.rest.dto";

export class ModalidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: ModalidadeFindOneInputDto): ModalidadeFindOneInput {
    const input = new ModalidadeFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: ModalidadeListInputDto | null): ModalidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new ModalidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: ModalidadeCreateInputDto): ModalidadeCreateInput {
    const input = new ModalidadeCreateInput();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: ModalidadeFindOneInputDto,
    dto: ModalidadeUpdateInputDto,
  ): ModalidadeFindOneInput & ModalidadeUpdateInput {
    const input = new ModalidadeFindOneInput() as ModalidadeFindOneInput & ModalidadeUpdateInput;
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

  static toFindOneOutputDto(output: ModalidadeFindOneOutput): ModalidadeFindOneOutputDto {
    const dto = new ModalidadeFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: ModalidadeListOutput): ModalidadeListOutputDto {
    const dto = new ModalidadeListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
