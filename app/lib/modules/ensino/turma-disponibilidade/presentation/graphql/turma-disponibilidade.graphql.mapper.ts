import { DisponibilidadeGraphqlMapper } from "@/modules/ensino/disponibilidade/presentation/graphql/disponibilidade.graphql.mapper";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/modules/ensino/turma-disponibilidade";
import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  TurmaDisponibilidadeCreateInputGraphQlDto,
  TurmaDisponibilidadeFindOneOutputGraphQlDto,
  TurmaDisponibilidadeListInputGraphQlDto,
  TurmaDisponibilidadeListOutputGraphQlDto,
  TurmaDisponibilidadeTurmaOutputGraphQlDto,
  TurmaDisponibilidadeUpdateInputGraphQlDto,
} from "./turma-disponibilidade.graphql.dto";

export class TurmaDisponibilidadeGraphqlMapper {
  static toListInput(
    dto: TurmaDisponibilidadeListInputGraphQlDto | null,
  ): TurmaDisponibilidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaDisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): TurmaDisponibilidadeFindOneInputDto {
    const input = new TurmaDisponibilidadeFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: TurmaDisponibilidadeCreateInputGraphQlDto,
  ): TurmaDisponibilidadeCreateInputDto {
    const input = new TurmaDisponibilidadeCreateInputDto();
    input.turma = { id: dto.turma.id };
    input.disponibilidade = { id: dto.disponibilidade.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: TurmaDisponibilidadeUpdateInputGraphQlDto,
  ): TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto {
    const input = new TurmaDisponibilidadeFindOneInputDto() as TurmaDisponibilidadeFindOneInputDto &
      TurmaDisponibilidadeUpdateInputDto;
    input.id = id;
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.disponibilidade !== undefined) {
      input.disponibilidade = { id: dto.disponibilidade.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: TurmaDisponibilidadeFindOneOutputDto,
  ): TurmaDisponibilidadeFindOneOutputGraphQlDto {
    const dto = new TurmaDisponibilidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.turma = output.turma as unknown as TurmaDisponibilidadeTurmaOutputGraphQlDto;
    dto.disponibilidade = DisponibilidadeGraphqlMapper.toFindOneOutputDto(output.disponibilidade);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    TurmaDisponibilidadeListOutputGraphQlDto,
    TurmaDisponibilidadeGraphqlMapper.toFindOneOutputDto,
  );
}
