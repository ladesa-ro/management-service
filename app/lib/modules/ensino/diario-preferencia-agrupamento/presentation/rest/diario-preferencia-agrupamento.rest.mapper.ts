import { DiarioRestMapper } from "@/modules/ensino/diario/presentation/rest";
import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import { IntervaloDeTempoRestMapper } from "@/modules/sisgha/intervalo-de-tempo/presentation/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoUpdateInputRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";

export class DiarioPreferenciaAgrupamentoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(DiarioPreferenciaAgrupamentoFindOneInputDto);

  static toListInput = createListInputMapper(DiarioPreferenciaAgrupamentoListInputDto, [
    "filter.id",
    "filter.diario.id",
  ]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioPreferenciaAgrupamentoListOutputRestDto,
    DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto,
  );
}
