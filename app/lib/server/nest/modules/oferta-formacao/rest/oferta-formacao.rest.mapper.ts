import {
  OfertaFormacaoCreateInput,
  OfertaFormacaoFindOneInput,
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoListInput,
  OfertaFormacaoListOutput,
  OfertaFormacaoUpdateInput,
} from "@/modules/oferta-formacao";
import { ModalidadeRestMapper } from "@/server/nest/modules/modalidade/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "./oferta-formacao.rest.dto";

export class OfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: OfertaFormacaoFindOneInputDto): OfertaFormacaoFindOneInput {
    const input = new OfertaFormacaoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: OfertaFormacaoListInputDto | null): OfertaFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.modalidade.id"] = dto["filter.modalidade.id"];
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputDto): OfertaFormacaoCreateInput {
    const input = new OfertaFormacaoCreateInput();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    params: OfertaFormacaoFindOneInputDto,
    dto: OfertaFormacaoUpdateInputDto,
  ): OfertaFormacaoFindOneInput & OfertaFormacaoUpdateInput {
    const input = new OfertaFormacaoFindOneInput() as OfertaFormacaoFindOneInput &
      OfertaFormacaoUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = { id: dto.modalidade.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: OfertaFormacaoFindOneOutput): OfertaFormacaoFindOneOutputDto {
    const dto = new OfertaFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = ModalidadeRestMapper.toFindOneOutputDto(output.modalidade);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: OfertaFormacaoListOutput): OfertaFormacaoListOutputDto {
    const dto = new OfertaFormacaoListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
