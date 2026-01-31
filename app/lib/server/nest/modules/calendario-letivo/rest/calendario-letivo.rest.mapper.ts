import {
  CalendarioLetivoCreateInput,
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
  CalendarioLetivoUpdateInput,
} from "@/modules/calendario-letivo";
import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "./calendario-letivo.rest.dto";

export class CalendarioLetivoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CalendarioLetivoFindOneInputDto): CalendarioLetivoFindOneInput {
    const input = new CalendarioLetivoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: CalendarioLetivoListInputDto | null): CalendarioLetivoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CalendarioLetivoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.campus.id"] = dto["filter.campus.id"];
    input["filter.ofertaFormacao.id"] = dto["filter.ofertaFormacao.id"];
    return input;
  }

  static toCreateInput(dto: CalendarioLetivoCreateInputDto): CalendarioLetivoCreateInput {
    const input = new CalendarioLetivoCreateInput();
    input.nome = dto.nome;
    input.ano = dto.ano;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: CalendarioLetivoFindOneInputDto,
    dto: CalendarioLetivoUpdateInputDto,
  ): CalendarioLetivoFindOneInput & CalendarioLetivoUpdateInput {
    const input = new CalendarioLetivoFindOneInput() as CalendarioLetivoFindOneInput &
      CalendarioLetivoUpdateInput;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.ano !== undefined) {
      input.ano = dto.ano;
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: CalendarioLetivoFindOneOutput,
  ): CalendarioLetivoFindOneOutputDto {
    const dto = new CalendarioLetivoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.ano = output.ano;
    dto.campus = output.campus as any;
    dto.ofertaFormacao = output.ofertaFormacao as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: CalendarioLetivoListOutput): CalendarioLetivoListOutputDto {
    const dto = new CalendarioLetivoListOutputDto();
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
