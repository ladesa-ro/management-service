import {
  NivelFormacaoCreateInput,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
  NivelFormacaoUpdateInput,
} from "@/modules/nivel-formacao";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoUpdateInputDto,
} from "../rest/nivel-formacao.rest.dto";
import {
  NivelFormacaoListInputGqlDto,
  NivelFormacaoListOutputGqlDto,
} from "./nivel-formacao.graphql.dto";

export class NivelFormacaoGraphqlMapper {
  static toListInput(dto: NivelFormacaoListInputGqlDto | null): NivelFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new NivelFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): NivelFormacaoFindOneInput {
    const input = new NivelFormacaoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: NivelFormacaoCreateInputDto): NivelFormacaoCreateInput {
    const input = new NivelFormacaoCreateInput();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: NivelFormacaoUpdateInputDto,
  ): NivelFormacaoFindOneInput & NivelFormacaoUpdateInput {
    const input = new NivelFormacaoFindOneInput() as NivelFormacaoFindOneInput &
      NivelFormacaoUpdateInput;
    input.id = id;
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(output: NivelFormacaoFindOneOutput): NivelFormacaoFindOneOutputDto {
    const dto = new NivelFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.slug = output.slug;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: NivelFormacaoListOutput): NivelFormacaoListOutputGqlDto {
    const dto = new NivelFormacaoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
