import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { IntervaloDeTempoRestMapper } from "@/server/nest/modules/intervalo-de-tempo/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto,
  DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoUpdateInputRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";

export class DiarioPreferenciaAgrupamentoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  ): DiarioPreferenciaAgrupamentoFindOneInputDto {
    const input = new DiarioPreferenciaAgrupamentoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: DiarioPreferenciaAgrupamentoListInputRestDto | null,
  ): DiarioPreferenciaAgrupamentoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioPreferenciaAgrupamentoListInputDto();
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
    dto: DiarioPreferenciaAgrupamentoCreateInputRestDto,
  ): DiarioPreferenciaAgrupamentoCreateInputDto {
    const input = new DiarioPreferenciaAgrupamentoCreateInputDto();
    input.dataInicio = dto.dataInicio;
    input.dataFim = dto.dataFim ?? null;
    input.diaSemanaIso = dto.diaSemanaIso;
    input.aulasSeguidas = dto.aulasSeguidas;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diario = { id: dto.diario.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
    dto: DiarioPreferenciaAgrupamentoUpdateInputRestDto,
  ): DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto {
    const input =
      new DiarioPreferenciaAgrupamentoFindOneInputDto() as DiarioPreferenciaAgrupamentoFindOneInputDto &
        DiarioPreferenciaAgrupamentoUpdateInputDto;
    input.id = params.id;
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim ?? null;
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
    output: DiarioPreferenciaAgrupamentoFindOneOutputDto,
  ): DiarioPreferenciaAgrupamentoFindOneOutputRestDto {
    const dto = new DiarioPreferenciaAgrupamentoFindOneOutputRestDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio;
    dto.dataFim = output.dataFim;
    dto.diaSemanaIso = output.diaSemanaIso;
    dto.aulasSeguidas = output.aulasSeguidas;
    dto.intervaloDeTempo = IntervaloDeTempoRestMapper.toFindOneOutputDto(output.intervaloDeTempo);
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: DiarioPreferenciaAgrupamentoListOutputDto,
  ): DiarioPreferenciaAgrupamentoListOutputRestDto {
    const dto = new DiarioPreferenciaAgrupamentoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
