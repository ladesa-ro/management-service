import {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/core/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";

export class OfertaFormacaoNivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): OfertaFormacaoNivelFormacaoFindOneInput {
    const input = new OfertaFormacaoNivelFormacaoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: OfertaFormacaoNivelFormacaoListInputDto | null,
  ): OfertaFormacaoNivelFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoNivelFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): OfertaFormacaoNivelFormacaoCreateInput {
    const input = new OfertaFormacaoNivelFormacaoCreateInput();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: OfertaFormacaoNivelFormacaoFindOneInputDto,
    dto: OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneInput() as OfertaFormacaoNivelFormacaoFindOneInput &
        OfertaFormacaoNivelFormacaoUpdateInput;
    input.id = params.id;
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.nivelFormacao !== undefined) {
      input.nivelFormacao = { id: dto.nivelFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneOutput,
  ): OfertaFormacaoNivelFormacaoFindOneOutputDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.ofertaFormacao = output.ofertaFormacao as any;
    dto.nivelFormacao = output.nivelFormacao as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: OfertaFormacaoNivelFormacaoListOutput,
  ): OfertaFormacaoNivelFormacaoListOutputDto {
    const dto = new OfertaFormacaoNivelFormacaoListOutputDto();
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
