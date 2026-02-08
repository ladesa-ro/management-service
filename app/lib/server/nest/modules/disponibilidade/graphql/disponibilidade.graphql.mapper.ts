import {
  DisponibilidadeCreateInput,
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  DisponibilidadeUpdateInput,
} from "@/modules/disponibilidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeUpdateInputDto,
} from "../rest/disponibilidade.rest.dto";
import {
  DisponibilidadeListInputGqlDto,
  DisponibilidadeListOutputGqlDto,
} from "./disponibilidade.graphql.dto";

export class DisponibilidadeGraphqlMapper {
  static toListInput(dto: DisponibilidadeListInputGqlDto | null): DisponibilidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DisponibilidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DisponibilidadeFindOneInput {
    const input = new DisponibilidadeFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DisponibilidadeCreateInputDto): DisponibilidadeCreateInput {
    const input = new DisponibilidadeCreateInput();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    return input;
  }

  static toUpdateInput(dto: DisponibilidadeUpdateInputDto): DisponibilidadeUpdateInput {
    const input = new DisponibilidadeUpdateInput();
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio as unknown as string;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim as unknown as string | null;
    }
    return input;
  }

  static toFindOneOutputDto(output: DisponibilidadeFindOneOutput): DisponibilidadeFindOneOutputDto {
    const dto = new DisponibilidadeFindOneOutputDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: DisponibilidadeListOutput): DisponibilidadeListOutputGqlDto {
    const dto = new DisponibilidadeListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
