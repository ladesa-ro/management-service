import {
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoUpdateCommand,
} from "@/modules/ensino/nivel-formacao";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  NivelFormacaoCreateInputGraphQlDto,
  NivelFormacaoFindOneOutputGraphQlDto,
  NivelFormacaoListInputGraphQlDto,
  NivelFormacaoListOutputGraphQlDto,
  NivelFormacaoUpdateInputGraphQlDto,
} from "./nivel-formacao.graphql.dto";

export class NivelFormacaoGraphqlMapper {
  static toListInput(dto: NivelFormacaoListInputGraphQlDto | null): NivelFormacaoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new NivelFormacaoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): NivelFormacaoFindOneQuery {
    const input = new NivelFormacaoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: NivelFormacaoCreateInputGraphQlDto): NivelFormacaoCreateCommand {
    const input = new NivelFormacaoCreateCommand();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: NivelFormacaoUpdateInputGraphQlDto,
  ): NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand {
    const input = new NivelFormacaoFindOneQuery() as NivelFormacaoFindOneQuery &
      NivelFormacaoUpdateCommand;
    input.id = params.id;
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: NivelFormacaoFindOneQueryResult,
  ): NivelFormacaoFindOneOutputGraphQlDto {
    const dto = new NivelFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    NivelFormacaoListOutputGraphQlDto,
    NivelFormacaoGraphqlMapper.toFindOneOutputDto,
  );
}
