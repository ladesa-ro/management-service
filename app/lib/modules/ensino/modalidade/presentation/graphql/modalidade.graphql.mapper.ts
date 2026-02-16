import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeUpdateInputDto,
} from "@/modules/ensino/modalidade";
import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";

export class ModalidadeGraphqlMapper {
  static toListInput(dto: ModalidadeListInputGraphQlDto | null): ModalidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ModalidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ModalidadeFindOneInputDto {
    const input = new ModalidadeFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: ModalidadeCreateInputGraphQlDto): ModalidadeCreateInputDto {
    const input = new ModalidadeCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: ModalidadeUpdateInputGraphQlDto,
  ): ModalidadeFindOneInputDto & ModalidadeUpdateInputDto {
    const input = new ModalidadeFindOneInputDto() as ModalidadeFindOneInputDto &
      ModalidadeUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(output: ModalidadeFindOneOutputDto): ModalidadeFindOneOutputGraphQlDto {
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
