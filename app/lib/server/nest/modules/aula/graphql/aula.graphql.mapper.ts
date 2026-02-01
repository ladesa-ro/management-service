import { AulaFindOneInput, AulaFindOneOutput, AulaListInput, AulaListOutput } from "@/modules/aula";
import { AulaFindOneOutputDto } from "../rest/aula.rest.dto";
import { AulaListInputGqlDto, AulaListOutputGqlDto } from "./aula.graphql.dto";

export class AulaGraphqlMapper {
  static toListInput(dto: AulaListInputGqlDto | null): AulaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new AulaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.intervaloDeTempo.id"] = dto.filterIntervaloDeTempoId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): AulaFindOneInput {
    const input = new AulaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: AulaFindOneOutput): AulaFindOneOutputDto {
    const dto = new AulaFindOneOutputDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.modalidade = output.modalidade;
    dto.intervaloDeTempo = output.intervaloDeTempo as any;
    dto.diario = output.diario as any;
    dto.ambiente = output.ambiente as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: AulaListOutput): AulaListOutputGqlDto {
    const dto = new AulaListOutputGqlDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
