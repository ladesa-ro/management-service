import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/modules/oferta-formacao";
import { ModalidadeGraphqlMapper } from "@/server/nest/modules/modalidade/graphql/modalidade.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";

export class OfertaFormacaoGraphqlMapper {
  static toListInput(
    dto: OfertaFormacaoListInputGraphQlDto | null,
  ): OfertaFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.modalidade.id"] = dto.filterModalidadeId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): OfertaFormacaoFindOneInputDto {
    const input = new OfertaFormacaoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputGraphQlDto): OfertaFormacaoCreateInputDto {
    const input = new OfertaFormacaoCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: OfertaFormacaoUpdateInputGraphQlDto,
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

  static toFindOneOutputDto(
    output: OfertaFormacaoFindOneOutputDto,
  ): OfertaFormacaoFindOneOutputGraphQlDto {
    const dto = new OfertaFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = ModalidadeGraphqlMapper.toFindOneOutputDto(output.modalidade);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: OfertaFormacaoListOutputDto): OfertaFormacaoListOutputGraphQlDto {
    const dto = new OfertaFormacaoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
