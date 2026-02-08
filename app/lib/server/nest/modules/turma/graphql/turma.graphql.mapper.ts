import {
  TurmaCreateInput,
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaListInput,
  TurmaListOutput,
  TurmaUpdateInput,
} from "@/modules/turma";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  TurmaCreateInputDto,
  TurmaFindOneOutputDto,
  TurmaUpdateInputDto,
} from "../rest/turma.rest.dto";
import { TurmaListInputGqlDto, TurmaListOutputGqlDto } from "./turma.graphql.dto";

export class TurmaGraphqlMapper {
  static toListInput(dto: TurmaListInputGqlDto | null): TurmaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): TurmaFindOneInput {
    const input = new TurmaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: TurmaCreateInputDto): TurmaCreateInput {
    const input = new TurmaCreateInput();
    input.periodo = dto.periodo;
    input.curso = dto.curso;
    input.ambientePadraoAula = dto.ambientePadraoAula;
    return input;
  }

  static toUpdateInput(id: string, dto: TurmaUpdateInputDto): TurmaFindOneInput & TurmaUpdateInput {
    const input = new TurmaFindOneInput() as TurmaFindOneInput & TurmaUpdateInput;
    input.id = id;
    if (dto.periodo !== undefined) {
      input.periodo = dto.periodo;
    }
    if (dto.curso !== undefined) {
      input.curso = dto.curso;
    }
    if (dto.ambientePadraoAula !== undefined) {
      input.ambientePadraoAula = dto.ambientePadraoAula;
    }
    return input;
  }

  static toFindOneOutputDto(output: TurmaFindOneOutput): TurmaFindOneOutputDto {
    return output as unknown as TurmaFindOneOutputDto;
  }

  static toListOutputDto(output: TurmaListOutput): TurmaListOutputGqlDto {
    const dto = new TurmaListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
