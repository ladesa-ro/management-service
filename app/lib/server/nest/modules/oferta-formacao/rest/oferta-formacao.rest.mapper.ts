import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/modules/oferta-formacao";
import { ModalidadeRestMapper } from "@/server/nest/modules/modalidade/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListInputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";

export class OfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: OfertaFormacaoFindOneInputRestDto): OfertaFormacaoFindOneInputDto {
    const input = new OfertaFormacaoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: OfertaFormacaoListInputRestDto | null,
  ): OfertaFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.modalidade.id"] = dto["filter.modalidade.id"];
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputRestDto): OfertaFormacaoCreateInputDto {
    const input = new OfertaFormacaoCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    params: OfertaFormacaoFindOneInputRestDto,
    dto: OfertaFormacaoUpdateInputRestDto,
  ): OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto {
    const input = new OfertaFormacaoFindOneInputDto() as OfertaFormacaoFindOneInputDto &
      OfertaFormacaoUpdateInputDto;
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

  static toFindOneOutputDto(
    output: OfertaFormacaoFindOneOutputDto,
  ): OfertaFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = ModalidadeRestMapper.toFindOneOutputDto(output.modalidade);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: OfertaFormacaoListOutputDto): OfertaFormacaoListOutputRestDto {
    const dto = new OfertaFormacaoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
