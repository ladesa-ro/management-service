import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeUpdateInputDto,
} from "@/modules/ensino/disponibilidade";
import { createListOutputMapper, mapDatedFields } from "@/server/nest/shared/mappers";
import {
  DisponibilidadeCreateInputGraphQlDto,
  DisponibilidadeFindOneOutputGraphQlDto,
  DisponibilidadeListInputGraphQlDto,
  DisponibilidadeListOutputGraphQlDto,
  DisponibilidadeUpdateInputGraphQlDto,
} from "./disponibilidade.graphql.dto";

export class DisponibilidadeGraphqlMapper {
  static toListInput(
    dto: DisponibilidadeListInputGraphQlDto | null,
  ): DisponibilidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DisponibilidadeFindOneInputDto {
    const input = new DisponibilidadeFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DisponibilidadeCreateInputGraphQlDto): DisponibilidadeCreateInputDto {
    const input = new DisponibilidadeCreateInputDto();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DisponibilidadeUpdateInputGraphQlDto,
  ): DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto {
    const input = new DisponibilidadeFindOneInputDto() as DisponibilidadeFindOneInputDto &
      DisponibilidadeUpdateInputDto;
    input.id = params.id;
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio as unknown as string;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim as unknown as string | null;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DisponibilidadeFindOneOutputDto,
  ): DisponibilidadeFindOneOutputGraphQlDto {
    const dto = new DisponibilidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DisponibilidadeListOutputGraphQlDto,
    DisponibilidadeGraphqlMapper.toFindOneOutputDto,
  );
}
