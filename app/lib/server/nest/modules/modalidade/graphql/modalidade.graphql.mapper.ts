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
  ModalidadeFindOneOutputDto,
  ModalidadeUpdateInputDto,
} from "../rest/modalidade.rest.dto";
import { ModalidadeListInputGqlDto, ModalidadeListOutputGqlDto } from "./modalidade.graphql.dto";

export class ModalidadeGraphqlMapper {
  static toListInput(dto: ModalidadeListInputGqlDto | null): ModalidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new ModalidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ModalidadeFindOneInput {
    const input = new ModalidadeFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: ModalidadeCreateInputDto): ModalidadeCreateInput {
    const input = new ModalidadeCreateInput();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: ModalidadeUpdateInputDto,
  ): ModalidadeFindOneInput & ModalidadeUpdateInput {
    const input = new ModalidadeFindOneInput() as ModalidadeFindOneInput & ModalidadeUpdateInput;
    input.id = id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(output: ModalidadeFindOneOutput): ModalidadeFindOneOutputDto {
    return output as unknown as ModalidadeFindOneOutputDto;
  }

  static toListOutputDto(output: ModalidadeListOutput): ModalidadeListOutputGqlDto {
    const dto = new ModalidadeListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
