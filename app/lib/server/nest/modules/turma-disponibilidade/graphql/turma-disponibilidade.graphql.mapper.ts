import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/modules/turma-disponibilidade";
import { DisponibilidadeGraphqlMapper } from "@/server/nest/modules/disponibilidade/graphql/disponibilidade.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
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
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: TurmaDisponibilidadeListOutputDto,
  ): TurmaDisponibilidadeListOutputGraphQlDto {
    const dto = new TurmaDisponibilidadeListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
