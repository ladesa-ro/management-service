import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  DiarioPreferenciaAgrupamentoListQuery,
} from "../domain";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../domain/queries";
import { DiarioRestMapper } from "./diario.rest.mapper";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto,
  DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  DiarioPreferenciaAgrupamentoParentParamsRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";

export class DiarioPreferenciaAgrupamentoRestMapper {
  static toListInput(
    parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    dto: DiarioPreferenciaAgrupamentoListInputRestDto,
  ): DiarioPreferenciaAgrupamentoListQuery {
    const input = new DiarioPreferenciaAgrupamentoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto["filter.id"];
    input["filter.diario.id"] = [parentParams.diarioId];
    return input;
  }

  static toBulkReplaceInput(
    parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
    dto: DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  ): DiarioPreferenciaAgrupamentoBulkReplaceCommand {
    const input = new DiarioPreferenciaAgrupamentoBulkReplaceCommand();
    input.diarioId = parentParams.diarioId;
    input.preferenciasAgrupamento = dto.preferenciasAgrupamento.map((p) => ({
      dataInicio: p.dataInicio,
      dataFim: p.dataFim ?? null,
      diaSemanaIso: p.diaSemanaIso,
      aulasSeguidas: p.aulasSeguidas,
    }));
    return input;
  }

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
