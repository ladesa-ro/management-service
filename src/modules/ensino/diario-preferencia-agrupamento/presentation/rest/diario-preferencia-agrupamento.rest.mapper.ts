import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import { DiarioRestMapper } from "@/modules/ensino/diario/presentation/rest";
import {
  DiarioPreferenciaAgrupamentoCreateCommand,
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoUpdateCommand,
} from "@/modules/ensino/diario-preferencia-agrupamento";
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

  static toFindOneInput = createFindOneInputMapper(DiarioPreferenciaAgrupamentoFindOneQuery);

  static toListInput = createListInputMapper(DiarioPreferenciaAgrupamentoListQuery, [
    "filter.id",
    "filter.diario.id",
  ]);

  static toCreateInput(
    dto: DiarioPreferenciaAgrupamentoCreateInputRestDto,
  ): DiarioPreferenciaAgrupamentoCreateCommand {
    const input = new DiarioPreferenciaAgrupamentoCreateCommand();
    input.dataInicio = dto.dataInicio;
    input.dataFim = dto.dataFim ?? null;
    input.diaSemanaIso = dto.diaSemanaIso;
    input.aulasSeguidas = dto.aulasSeguidas;
    input.diario = { id: dto.diario.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioPreferenciaAgrupamentoFindOneInputRestDto,
    dto: DiarioPreferenciaAgrupamentoUpdateInputRestDto,
  ): DiarioPreferenciaAgrupamentoFindOneQuery & DiarioPreferenciaAgrupamentoUpdateCommand {
    const input =
      new DiarioPreferenciaAgrupamentoFindOneQuery() as DiarioPreferenciaAgrupamentoFindOneQuery &
        DiarioPreferenciaAgrupamentoUpdateCommand;
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
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: DiarioPreferenciaAgrupamentoFindOneQueryResult,
  ): DiarioPreferenciaAgrupamentoFindOneOutputRestDto {
    const dto = new DiarioPreferenciaAgrupamentoFindOneOutputRestDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio;
    dto.dataFim = output.dataFim;
    dto.diaSemanaIso = output.diaSemanaIso;
    dto.aulasSeguidas = output.aulasSeguidas;
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioPreferenciaAgrupamentoListOutputRestDto,
    DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto,
  );
}
