import {
  TurmaDisponibilidadeCreateInput,
  TurmaDisponibilidadeFindOneInput,
  TurmaDisponibilidadeFindOneOutput,
  TurmaDisponibilidadeListInput,
  TurmaDisponibilidadeListOutput,
  TurmaDisponibilidadeUpdateInput,
} from "@/modules/turma-disponibilidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../rest/turma-disponibilidade.rest.dto";
import {
  TurmaDisponibilidadeListInputGqlDto,
  TurmaDisponibilidadeListOutputGqlDto,
} from "./turma-disponibilidade.graphql.dto";

export class TurmaDisponibilidadeGraphqlMapper {
  static toListInput(
    dto: TurmaDisponibilidadeListInputGqlDto | null,
  ): TurmaDisponibilidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaDisponibilidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): TurmaDisponibilidadeFindOneInput {
    const input = new TurmaDisponibilidadeFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: TurmaDisponibilidadeCreateInputDto): TurmaDisponibilidadeCreateInput {
    const input = new TurmaDisponibilidadeCreateInput();
    input.turma = dto.turma;
    input.disponibilidade = dto.disponibilidade;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: TurmaDisponibilidadeUpdateInputDto,
  ): TurmaDisponibilidadeFindOneInput & TurmaDisponibilidadeUpdateInput {
    const input = new TurmaDisponibilidadeFindOneInput() as TurmaDisponibilidadeFindOneInput &
      TurmaDisponibilidadeUpdateInput;
    input.id = id;
    if (dto.turma !== undefined) {
      input.turma = dto.turma;
    }
    if (dto.disponibilidade !== undefined) {
      input.disponibilidade = dto.disponibilidade;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: TurmaDisponibilidadeFindOneOutput,
  ): TurmaDisponibilidadeFindOneOutputDto {
    return output as unknown as TurmaDisponibilidadeFindOneOutputDto;
  }

  static toListOutputDto(
    output: TurmaDisponibilidadeListOutput,
  ): TurmaDisponibilidadeListOutputGqlDto {
    const dto = new TurmaDisponibilidadeListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
