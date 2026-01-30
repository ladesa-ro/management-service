import {
  DiarioPreferenciaAgrupamentoCreateInput,
  DiarioPreferenciaAgrupamentoFindOneInput,
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListInput,
  DiarioPreferenciaAgrupamentoListOutput,
  DiarioPreferenciaAgrupamentoUpdateInput,
} from "@/core/diario-preferencia-agrupamento";
import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "./diario-preferencia-agrupamento.rest.dto";

export class DiarioPreferenciaAgrupamentoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto,
  ): DiarioPreferenciaAgrupamentoFindOneInput {
    const input = new DiarioPreferenciaAgrupamentoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: DiarioPreferenciaAgrupamentoListInputDto | null,
  ): DiarioPreferenciaAgrupamentoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioPreferenciaAgrupamentoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.diario.id"] = dto["filter.diario.id"];
    return input;
  }

  static toCreateInput(
    dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): DiarioPreferenciaAgrupamentoCreateInput {
    const input = new DiarioPreferenciaAgrupamentoCreateInput();
    input.dataInicio = new Date(dto.dataInicio);
    input.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    input.diaSemanaIso = dto.diaSemanaIso;
    input.aulasSeguidas = dto.aulasSeguidas;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diario = { id: dto.diario.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioPreferenciaAgrupamentoFindOneInputDto,
    dto: DiarioPreferenciaAgrupamentoUpdateInputDto,
  ): DiarioPreferenciaAgrupamentoFindOneInput & DiarioPreferenciaAgrupamentoUpdateInput {
    const input =
      new DiarioPreferenciaAgrupamentoFindOneInput() as DiarioPreferenciaAgrupamentoFindOneInput &
        DiarioPreferenciaAgrupamentoUpdateInput;
    input.id = params.id;
    if (dto.dataInicio !== undefined) {
      input.dataInicio = new Date(dto.dataInicio);
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim ? new Date(dto.dataFim) : null;
    }
    if (dto.diaSemanaIso !== undefined) {
      input.diaSemanaIso = dto.diaSemanaIso;
    }
    if (dto.aulasSeguidas !== undefined) {
      input.aulasSeguidas = dto.aulasSeguidas;
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: DiarioPreferenciaAgrupamentoFindOneOutput,
  ): DiarioPreferenciaAgrupamentoFindOneOutputDto {
    const dto = new DiarioPreferenciaAgrupamentoFindOneOutputDto();
    dto.id = output.id;
    dto.dataInicio =
      output.dataInicio instanceof Date
        ? output.dataInicio.toISOString().split("T")[0]
        : String(output.dataInicio);
    dto.dataFim = output.dataFim
      ? output.dataFim instanceof Date
        ? output.dataFim.toISOString().split("T")[0]
        : String(output.dataFim)
      : null;
    dto.diaSemanaIso = output.diaSemanaIso;
    dto.aulasSeguidas = output.aulasSeguidas;
    dto.intervaloDeTempo = output.intervaloDeTempo as any;
    dto.diario = output.diario as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: DiarioPreferenciaAgrupamentoListOutput,
  ): DiarioPreferenciaAgrupamentoListOutputDto {
    const dto = new DiarioPreferenciaAgrupamentoListOutputDto();
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
