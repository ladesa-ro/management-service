import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/modules/nivel-formacao";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  NivelFormacaoCreateInputGraphQlDto,
  NivelFormacaoFindOneOutputGraphQlDto,
  NivelFormacaoListInputGraphQlDto,
  NivelFormacaoListOutputGraphQlDto,
  NivelFormacaoUpdateInputGraphQlDto,
} from "./nivel-formacao.graphql.dto";

export class NivelFormacaoGraphqlMapper {
  static toListInput(
    dto: NivelFormacaoListInputGraphQlDto | null,
  ): NivelFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new NivelFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): NivelFormacaoFindOneInputDto {
    const input = new NivelFormacaoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: NivelFormacaoCreateInputGraphQlDto): NivelFormacaoCreateInputDto {
    const input = new NivelFormacaoCreateInputDto();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: NivelFormacaoUpdateInputGraphQlDto,
  ): NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto {
    const input = new NivelFormacaoFindOneInputDto() as NivelFormacaoFindOneInputDto &
      NivelFormacaoUpdateInputDto;
    input.id = params.id;
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: NivelFormacaoFindOneOutputDto,
  ): NivelFormacaoFindOneOutputGraphQlDto {
    const dto = new NivelFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.slug = output.slug;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: NivelFormacaoListOutputDto): NivelFormacaoListOutputGraphQlDto {
    const dto = new NivelFormacaoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
