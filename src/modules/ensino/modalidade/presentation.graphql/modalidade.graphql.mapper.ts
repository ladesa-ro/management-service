import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";

export class ModalidadeGraphqlMapper {
  static toListInput(dto: ModalidadeListInputGraphQlDto | null): ModalidadeListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new ModalidadeListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ModalidadeFindOneQuery {
    const input = new ModalidadeFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: ModalidadeCreateInputGraphQlDto): ModalidadeCreateCommand {
    const input = new ModalidadeCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: ModalidadeUpdateInputGraphQlDto,
  ): ModalidadeFindOneQuery & ModalidadeUpdateCommand {
    const input = new ModalidadeFindOneQuery() as ModalidadeFindOneQuery & ModalidadeUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: ModalidadeFindOneQueryResult,
  ): ModalidadeFindOneOutputGraphQlDto {
    const dto = new ModalidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ModalidadeListOutputGraphQlDto,
    ModalidadeGraphqlMapper.toFindOneOutputDto,
  );
}
